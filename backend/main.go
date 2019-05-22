package main

import (
	"flag"
	"log"
	"time"

	// "fmt"
	// "errors"
	"crypto/rand"
	"database/sql"
	"net/http"
	"regexp"
	"strings"

	jwt "github.com/appleboy/gin-jwt"
	"github.com/gin-gonic/autotls"
	"github.com/gin-gonic/gin"

	// "github.com/gin-contrib/secure"
	"github.com/mssola/user_agent"
	"golang.org/x/crypto/bcrypt"

	// "github.com/oliveroneill/exponent-server-sdk-golang/sdk"

	_ "github.com/go-sql-driver/mysql"
)

var isLocal = flag.Bool("local", true, "Whether this is running locally")
var ROOT_URL = "api.qolty.com"
var db *sql.DB
var ValidEmailType = regexp.MustCompile("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$")

type Profile struct {
	Email string `json:"email" binding:"required"`
	Name  string `json:"name" binding:"required"`
	Dob   string `json:"dob" binding:"required"`
}

type Login struct {
	Email    string `json:"email" binding:"required"`
	Password string `json:"password" binding:"required"`
}

type changePasswordRequest struct {
	OldPassword string `json:"oldPassword" binding:"required"`
	NewPassword string `json:"newPassword" binding:"required"`
	Email       string `json:"email" binding:"required"`
}

type DiagnosisRequest struct {
	DiagnosisId string `json:"diagnosisId" binding:"required"`
	Diagnosis string `json:"diagnosis" binding:"required"`
}

type User struct {
	UserId string
}

type validateStudyIDRequest struct {
	StudyID string `json:"study_id" binding:"required"`
}

type RegisterUserRequest struct {
	Email    string `json:"email" binding:"required"`
	Password string `json:"password" binding:"required"`
	Name     string `json:"name" binding:"required"`
	Dob      string `json:"dob" binding:"required"`
}

type RegisterPushNotificationsRequest struct {
	Token string `json:"token"`
}

type FavoriteRequest struct {
	ContentId uint64 `json:"content_id"`
}

type MoodLogRequest struct {
	PersonalFeeling uint64 `json:"personalFeeling"`
	BabyFeeling     uint64 `json:"babyFeeling"`
}

type MoodLog struct {
	Id                    uint64    `json:"mood_log_id"`
	UserId                string    `json:"user_id"`
	Timestamp             time.Time `json:"timestamp"`
	PersonalFeeling       uint64    `json:"personal_feeling"`
	BabyFeeling           uint64    `json:"baby_feeling"`
	ReflectionEnvironment string    `json:"reflection_environment"`
	ReflectionFocus       string    `json:"reflection_focus"`
	ReflectionClarity     string    `json:"reflection_clarity"`
}

type TodoRequest struct {
	Todo_list_id  uint64 `json:"todo_list_id"`
	Name          string `json:"name"`
	Checked       uint8  `json:"checked"`
	Check_list_id uint64 `json:"check_list_id"`
	Url           string `json:"url"`
	Notes         string `json:"notes"`
	UserId        string `json:"user_id"`
	Alert         string `json:"alert"`
}

type CheckListRequest struct {
	Check_list_id uint64 `json:"check_list_id"`
	Name          string `json:"name"`
}

type MedicationRequest struct {
	MedicationId string `json:"medicationId" binding:"required"`
	PrescriptionName string `json:"prescriptionName" binding:"required"`
	Dosage string `json:"dosage" binding:"required"`
	DosageInstructions string `json:"dosageInstructions" binding:"required"`
}

type DoctorRequest struct {
	DoctorId string `json:"doctorId" binding:"required"`
	DoctorType string `json:"doctorType" binding:"required"`
	DoctorName string `json:"doctorName" binding:"required"`
	DoctorNumber string `json:"doctorNumber" binding:"required"`
}

type TestResponse struct {
	Test string `json:"test"`
}

func redirToHTTPS(w http.ResponseWriter, req *http.Request) {
	http.Redirect(w, req, ROOT_URL, http.StatusMovedPermanently)
}

func hashAndSalt(pwd string) (string, error) {
	// Use GenerateFromPassword to hash & salt pwd
	// MinCost is just an integer constant provided by the bcrypt
	// package along with DefaultCost & MaxCost.
	// The cost can be any value you want provided it isn't lower
	// than the MinCost (4)
	hash, err := bcrypt.GenerateFromPassword([]byte(pwd), bcrypt.MinCost)
	if err != nil {
		return "", err
	}
	// GenerateFromPassword returns a byte slice so we need to
	// convert the bytes to a string and return it
	return string(hash), nil
}

func comparePasswords(hashedPwd string, plainPwd string) bool {
	// Since we'll be getting the hashed password from the DB it
	// will be a string so we'll need to convert it to a byte slice
	byteHash := []byte(hashedPwd)
	err := bcrypt.CompareHashAndPassword(byteHash, []byte(plainPwd))
	if err != nil {
		log.Println(err)
		return false
	}

	return true
}

// GenerateRandomBytes returns securely generated random bytes.
// It will return an error if the system's secure random
// number generator fails to function correctly, in which
// case the caller should not continue.
func GenerateRandomBytes(n int) ([]byte, error) {
	b := make([]byte, n)
	_, err := rand.Read(b)
	// Note that err == nil only if we read len(b) bytes.
	if err != nil {
		return nil, err
	}

	return b, nil
}

// GenerateRandomString returns a securely generated random string.
// It will return an error if the system's secure random
// number generator fails to function correctly, in which
// case the caller should not continue.
func GenerateRandomString(n int) (string, error) {
	const letters = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
	bytes, err := GenerateRandomBytes(n)
	if err != nil {
		return "", err
	}
	for i, b := range bytes {
		bytes[i] = letters[b%byte(len(letters))]
	}
	return string(bytes), nil
}

func userDataByEmail(email string) (string, string, error) {
	stmtOut, err := db.Prepare("SELECT password, public_id from User WHERE email = ?")
	if err != nil {
		return "", "", err
	}
	defer stmtOut.Close()

	var password, public_id string

	err = stmtOut.QueryRow(email).Scan(&password, &public_id)
	if err != nil {
		return "", "", err
	}

	return password, public_id, nil
}

func emailExistsInDB(email string) (bool, error) {
	stmtOut, err := db.Prepare("SELECT EXISTS(SELECT email from User WHERE email = ?)")
	if err != nil {
		return false, err
	}
	defer stmtOut.Close()

	var exists int

	err = stmtOut.QueryRow(email).Scan(&exists)
	if err != nil {
		return false, err
	}

	if exists == 1 {
		return true, nil
	}

	return false, nil
}

func validateStudyID(c *gin.Context) {
	var request validateStudyIDRequest

	if err := c.ShouldBindJSON(&request); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid parameters."})
		log.Println(err)
		return
	}

	if request.StudyID != "cn9nz5w1" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid study ID."})
		return
	}

	c.JSON(200, gin.H{"error": nil})
}

func addDiagnosis(c *gin.Context) {
	var request DiagnosisRequest

	claims := jwt.ExtractClaims(c)
	userId := claims["id"]

	if err := c.ShouldBindJSON(&request); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid Format Diagnosis."})
		log.Println(err)
		return
	}
	diagnosis := request.Diagnosis

	stmtIns, err := db.Prepare("INSERT INTO Diagnosis (user_id, name) VALUES (?, ?)")
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error handling request."})
		log.Println(err)
		return
	}
	defer stmtIns.Close()

	_, err = stmtIns.Exec(userId, diagnosis)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error handling request."})
		log.Println(err)
		return
	}
}

func editDiagnosis(c *gin.Context) {
	var request DiagnosisRequest
	if err := c.ShouldBindJSON(&request); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid Format Diagnosis"})
		log.Println(err)
		return
	}
	diagnosisId := request.DiagnosisId
	diagnosis := request.Diagnosis

	stmtEdit, err := db.Prepare("UPDATE Diagnosis SET name=? WHERE diagnosis_id=?")
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error handling request."})
		log.Println(err)
		return
	}
	defer stmtEdit.Close()

	_, err = stmtEdit.Exec(diagnosis, diagnosisId)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error handling request."})
		log.Println(err)
		return
	}
 }

func delDiagnosis(c *gin.Context) {
	var request DiagnosisRequest
	if err := c.ShouldBindJSON(&request); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid Format Diagnosis."})
		log.Println(err)
		return
	}

	diagnosisId := request.DiagnosisId

	stmtDel, err := db.Prepare("DELETE FROM Diagnosis WHERE diagnosis_id=?")
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error handling request."})
		log.Println(err)
		return
	}
	defer stmtDel.Close()

	_, err = stmtDel.Exec(diagnosisId)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error handling request."})
		log.Println(err)
		return
	}
}

func addMedication (c *gin.Context) {
	var request MedicationRequest

	claims := jwt.ExtractClaims(c)
	userId := claims["id"]

	if err := c.ShouldBindJSON(&request); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid Format Medication."})
		log.Println(err)
		return
	}

	prescriptionName := request.PrescriptionName
	dosage := request.Dosage
	dosageInstructions := request.DosageInstructions

	stmtIns, err := db.Prepare("INSERT INTO Medication (user_id, prescription_name, dosage, dosage_instructions) VALUES (?, ?, ?, ?)")
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error handling request."})
		log.Println(err)
		return
	}
	defer stmtIns.Close()

	_, err = stmtIns.Exec(userId, prescriptionName, dosage, dosageInstructions)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error handling request."})
		log.Println(err)
		return
	}
}

func editMedication (c *gin.Context) {
	var request MedicationRequest

	if err := c.ShouldBindJSON(&request); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid Format Medication."})
		log.Println(err)
		return
	}

	medicationId := request.MedicationId
	prescriptionName := request.PrescriptionName
	dosage := request.Dosage
	dosageInstructions := request.DosageInstructions

	stmtEdit, err := db.Prepare("UPDATE Medication SET prescription_name=?, dosage=?, dosage_instructions=? WHERE medication_id=?")
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error handling request."})
		log.Println(err)
		return
	}
	defer stmtEdit.Close()

	_, err = stmtEdit.Exec(prescriptionName, dosage, dosageInstructions, medicationId)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error handling request."})
		log.Println(err)
		return
	}
}

func delMedication(c *gin.Context) {
	var request MedicationRequest
	if err := c.ShouldBindJSON(&request); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid Format Diagnosis."})
		log.Println(err)
		return
	}

	medicationId := request.MedicationId

	stmtDel, err := db.Prepare("DELETE FROM Medication WHERE medication_id=?")
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error handling request."})
		log.Println(err)
		return
	}
	defer stmtDel.Close()

	_, err = stmtDel.Exec(medicationId)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error handling request."})
		log.Println(err)
		return
	}
}

func addDoctor (c *gin.Context) {
	var request DoctorRequest

	claims := jwt.ExtractClaims(c)
	userId := claims["id"]

	if err := c.ShouldBindJSON(&request); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid Format Medication."})
		log.Println(err)
		return
	}

	doctorType := request.DoctorType
	doctorName := request.DoctorName
	doctorNumber := request.DoctorNumber

	stmtIns, err := db.Prepare("INSERT INTO Doctor (user_id, type, name, number) VALUES (?, ?, ?, ?)")
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error handling request."})
		log.Println(err)
		return
	}
	defer stmtIns.Close()

	_, err = stmtIns.Exec(userId, doctorType, doctorName, doctorNumber)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error handling request."})
		log.Println(err)
		return
	}
}

func editDoctor (c *gin.Context) {
	var request DoctorRequest

	if err := c.ShouldBindJSON(&request); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid Format Medication."})
		log.Println(err)
		return
	}

	doctorId := request.DoctorId
	doctorType := request.DoctorType
	doctorName := request.DoctorName
	doctorNumber := request.DoctorNumber

	stmtEdit, err := db.Prepare("UPDATE Doctor SET type=?, name=?, number=? WHERE doctor_id=?")
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error handling request."})
		log.Println(err)
		return
	}
	defer stmtEdit.Close()

	_, err = stmtEdit.Exec(doctorType, doctorName, doctorNumber, doctorId)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error handling request."})
		log.Println(err)
		return
	}
}

func delDoctor(c *gin.Context) {
	var request DoctorRequest
	if err := c.ShouldBindJSON(&request); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid Format Diagnosis."})
		log.Println(err)
		return
	}

	doctorId := request.DoctorId

	stmtDel, err := db.Prepare("DELETE FROM Doctor WHERE doctor_id=?")
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error handling request."})
		log.Println(err)
		return
	}
	defer stmtDel.Close()

	_, err = stmtDel.Exec(doctorId)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error handling request."})
		log.Println(err)
		return
	}
}

func changePassword(c *gin.Context) {
	var request changePasswordRequest

	if err := c.ShouldBindJSON(&request); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid parameters."})
		log.Println(err)
		return
	}

	claims := jwt.ExtractClaims(c)
	userId := claims["id"]

	log.Println(userId)

	email := request.Email
	oldPassword := request.OldPassword
	newPassword := request.NewPassword

	hashedNewPass, err := hashAndSalt(newPassword)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error handling request."})
		log.Println(err)
		return
	}

	hashedOldPass, _, err := userDataByEmail(email)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error handling request."})
		log.Println(err)
		return
	}

	if !comparePasswords(hashedOldPass, oldPassword) {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Old Password is not matched."})
		return
	}

	stmtUpd, err := db.Prepare("UPDATE User SET password= ? WHERE email = ?")
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error handling request."})
		log.Println(err)
		return
	}
	defer stmtUpd.Close()

	_, err = stmtUpd.Exec(hashedNewPass, email)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error handling request."})
		log.Println(err)
		return
	}

	c.JSON(201, gin.H{"error": nil})
}

func myHandler(c *gin.Context) {
	var request Login

	//var res []byte
	if err := c.ShouldBindJSON(&request); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid parameterssdsd."})
		log.Println(c.ContentType())
		return
	}

	//s := string(res[:])
	log.Println(c.ContentType())
	log.Println(request.Email)
	log.Println(request.Password)

	//c.JSON(200, request.Password)

	// log.Println(strings.ToLower(request.Email))
	return
}

func registerUser(c *gin.Context) {
	var request RegisterUserRequest

	if err := c.ShouldBindJSON(&request); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid parameters."})
		log.Println(err)
		return
	}

	email := strings.ToLower(request.Email)

	if !ValidEmailType.MatchString(email) {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid email."})
		log.Println("Invalid email:", email)
		return
	}

	emailExists, err := emailExistsInDB(email)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error handling request."})
		log.Println(err)
		return
	}

	if emailExists {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Email already exists."})
		log.Println("Email already exists in DB:", email)
		return
	}

	publicId, err := GenerateRandomString(32)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error handling request."})
		log.Println(err)
		return
	}

	stmtIns, err := db.Prepare("INSERT INTO User (email, password, public_id) VALUES( ?, ?, ? )")
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error handling request."})
		log.Println(err)
		return
	}
	defer stmtIns.Close()

	hashedPass, err := hashAndSalt(request.Password)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error handling request."})
		log.Println(err)
		return
	}

	res, err := stmtIns.Exec(email, hashedPass, publicId)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error handling request."})
		log.Println(err)
		return
	}

	parent_id, err := res.LastInsertId()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error handling request."})
		log.Println(err)
		return
	}

	publicBabyId, err := GenerateRandomString(32)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error handling request."})
		log.Println(err)
		return
	}

	stmtIns2, err := db.Prepare("INSERT INTO Baby (name, dob, public_id, parent_id) VALUES( ?, ?, ?, ? )")
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error handling request."})
		log.Println(err)
		return
	}
	defer stmtIns2.Close()

	_, err = stmtIns2.Exec(request.Name, request.Dob, publicBabyId, parent_id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error handling request."})
		log.Println(err)
		return
	}

	c.JSON(200, gin.H{"error": nil})
}

func loadContent(userId string) ([]map[string]string, error) {
	content := make([]map[string]string, 0)

	rows, err := db.Query("select Content.*, FavoriteContent.favorite_content_id from Content left join FavoriteContent on Content.content_id=FavoriteContent.content_id and FavoriteContent.user_id='" + userId + "';")
	if err != nil {
		return content, err
	}

	// Get column names
	columns, err := rows.Columns()
	if err != nil {
		return content, err
	}

	// Make a slice for the values
	values := make([]sql.RawBytes, len(columns))

	scanArgs := make([]interface{}, len(values))
	for i := range values {
		scanArgs[i] = &values[i]
	}

	// Fetch rows
	for rows.Next() {
		// get RawBytes from data
		err = rows.Scan(scanArgs...)
		if err != nil {
			return content, err
		}

		contentItem := make(map[string]string, 0)

		var value string

		for i, col := range values {
			// Here we can check if the value is nil (NULL value)
			if col == nil {
				value = "NULL"
			} else {
				value = string(col)
			}

			if columns[i] == "favorite_content_id" && value != "NULL" {
				contentItem[columns[i]] = "1"
			}

			contentItem[columns[i]] = value
		}

		content = append(content, contentItem)
	}
	if err = rows.Err(); err != nil {
		return content, err
	}

	return content, nil
}

func loadData(tableName string, userId string) ([]map[string]string, error) {
	content := make([]map[string]string, 0)

	extraConditions := ""

	if tableName == "MoodLog" {
		extraConditions = " where user_id='" + userId + "' order by timestamp desc"
	}

	if tableName == "TodoList" {
		extraConditions = " where user_id='" + userId + "' "
	}

	if tableName == "Diagnosis" {
		extraConditions = " where user_id='" + userId + "' "
	}

	if tableName == "Medication" {
		extraConditions = " where user_id='" + userId + "' "
	}

	if tableName == "Doctor" {
		extraConditions = " where user_id='" + userId + "' "
	}

	rows, err := db.Query("SELECT * FROM " + tableName + extraConditions)
	if err != nil {
		return content, err
	}

	// Get column names
	columns, err := rows.Columns()
	if err != nil {
		return content, err
	}

	// Make a slice for the values
	values := make([]sql.RawBytes, len(columns))

	scanArgs := make([]interface{}, len(values))
	for i := range values {
		scanArgs[i] = &values[i]
	}

	// Fetch rows
	for rows.Next() {
		// get RawBytes from data
		err = rows.Scan(scanArgs...)
		if err != nil {
			return content, err
		}

		contentItem := make(map[string]string, 0)

		var value string

		for i, col := range values {
			// Here we can check if the value is nil (NULL value)
			if col == nil {
				value = "NULL"
			} else {
				value = string(col)
			}

			contentItem[columns[i]] = value
		}

		content = append(content, contentItem)
	}
	if err = rows.Err(); err != nil {
		return content, err
	}

	return content, nil
}

func loadProfile(userId string) (Profile, error) {
	var profile Profile

	stmtOut, err := db.Prepare("SELECT User.email, Baby.name, Baby.dob from User inner join Baby on User.user_id=Baby.parent_id WHERE User.public_id = ?")
	if err != nil {
		return profile, err
	}
	defer stmtOut.Close()

	err = stmtOut.QueryRow(userId).Scan(&profile.Email, &profile.Name, &profile.Dob)
	if err != nil {
		return profile, err
	}

	return profile, nil
}

func loadCategories(category string) ([]map[string]string, error) {
	categories := make([]map[string]string, 0)

	rows, err := db.Query("SELECT * FROM " + category)
	if err != nil {
		return categories, err
	}

	// Get column names
	columns, err := rows.Columns()
	if err != nil {
		return categories, err
	}

	// Make a slice for the values
	values := make([]sql.RawBytes, len(columns))

	scanArgs := make([]interface{}, len(values))
	for i := range values {
		scanArgs[i] = &values[i]
	}

	// Fetch rows
	for rows.Next() {
		// get RawBytes from data
		err = rows.Scan(scanArgs...)
		if err != nil {
			return categories, err
		}

		contentItem := make(map[string]string, 0)

		var value string

		for i, col := range values {
			// Here we can check if the value is nil (NULL value)
			if col == nil {
				value = "NULL"
			} else {
				value = string(col)
			}

			contentItem[columns[i]] = value
		}

		categories = append(categories, contentItem)
	}
	if err = rows.Err(); err != nil {
		return categories, err
	}

	return categories, nil
}

func getContent(c *gin.Context) {
	claims := jwt.ExtractClaims(c)
	userId := claims["id"].(string)

	content, err := loadContent(userId)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error handling request."})
		log.Println(err)
		return
	}

	checkList, err := loadData("CheckList", "")
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error handling request."})
		log.Println(err)
		return
	}

	todoList, err := loadData("TodoList", userId)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error handling request."})
		log.Println(err)
		return
	}

	moodLog, err := loadData("MoodLog", userId)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error handling request."})
		log.Println(err)
		return
	}

	diagnosis, err := loadData("Diagnosis", userId)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error handling request."})
		log.Println(err)
		return
	}

	medications, err := loadData("Medication", userId)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error handling request."})
		log.Println(err)
		return
	}

	doctors, err := loadData("Doctor", userId)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error handling request."})
		log.Println(err)
		return
	}

	profile, err := loadProfile(userId)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error handling request."})
		log.Println(err)
		return
	}

	libraryCategoriesTableName := "LibraryCategory"
	resourceCategoriesTableName := "ResourceCategory"
	wellnessCategoriesTableName := "WellnessCategory"

	libraryCategories, err := loadCategories(libraryCategoriesTableName)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error handling request."})
		log.Println(err)
		return
	}

	resourceCategories, err := loadCategories(resourceCategoriesTableName)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error handling request."})
		log.Println(err)
		return
	}

	wellnessCategories, err := loadCategories(wellnessCategoriesTableName)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error handling request."})
		log.Println(err)
		return
	}

	categories := make(map[string][]map[string]string, 0)

	categories[libraryCategoriesTableName] = libraryCategories
	categories[resourceCategoriesTableName] = resourceCategories
	categories[wellnessCategoriesTableName] = wellnessCategories

	c.JSON(200, gin.H{"content": content, "checkList": checkList, "todoList": todoList, "moodLog": moodLog, "categories": categories, "profile": profile, "diagnosis": diagnosis, "medications": medications, "doctors": doctors})
}

func moodLog(c *gin.Context) {
	var request MoodLogRequest

	if err := c.ShouldBindJSON(&request); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid parameters."})
		log.Println(err)
		return
	}

	claims := jwt.ExtractClaims(c)
	userId := claims["id"]
	now := time.Now()

	stmtIns, err := db.Prepare("INSERT INTO MoodLog (user_id, timestamp, baby_feeling, personal_feeling, reflection_environment, reflection_focus, reflection_clarity) VALUES( ?, ?, ?, ?, ?, ?, ? )")
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error handling request."})
		log.Println(err)
		return
	}
	defer stmtIns.Close()

	res, err := stmtIns.Exec(userId, now, request.BabyFeeling, request.PersonalFeeling, "", "", "")
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error handling request."})
		log.Println(err)
		return
	}

	id, err := res.LastInsertId()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error handling request."})
		log.Println(err)
		return
	}

	moodLog := &MoodLog{
		Id:                    uint64(id),
		UserId:                userId.(string),
		Timestamp:             now,
		PersonalFeeling:       request.PersonalFeeling,
		BabyFeeling:           request.BabyFeeling,
		ReflectionEnvironment: "",
		ReflectionFocus:       "",
		ReflectionClarity:     "",
	}

	c.JSON(200, gin.H{"logData": moodLog, "error": nil})
}

func moodUpdate(c *gin.Context) {
	var request MoodLog

	if err := c.ShouldBindJSON(&request); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid parameters."})
		log.Println(err)
		return
	}

	claims := jwt.ExtractClaims(c)
	userId := claims["id"]

	log.Println(userId)

	stmtUpd, err := db.Prepare("UPDATE MoodLog SET baby_feeling= ?, personal_feeling = ?, reflection_environment = ?, reflection_focus = ?, reflection_clarity = ? WHERE mood_log_id = ?")
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error handling request."})
		log.Println(err)
		return
	}
	defer stmtUpd.Close()

	_, err = stmtUpd.Exec(request.BabyFeeling, request.PersonalFeeling, request.ReflectionEnvironment, request.ReflectionFocus, request.ReflectionClarity, request.Id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error handling request."})
		log.Println(err)
		return
	}

	mood := &MoodLog{
		Id:                    request.Id,
		UserId:                request.UserId,
		Timestamp:             request.Timestamp,
		PersonalFeeling:       request.PersonalFeeling,
		BabyFeeling:           request.BabyFeeling,
		ReflectionEnvironment: request.ReflectionEnvironment,
		ReflectionFocus:       request.ReflectionFocus,
		ReflectionClarity:     request.ReflectionClarity,
	}

	c.JSON(201, gin.H{"mood": mood, "error": nil})
}

func addFavorite(c *gin.Context) {
	var request FavoriteRequest

	if err := c.ShouldBindJSON(&request); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid parameters."})
		log.Println(err)
		return
	}

	claims := jwt.ExtractClaims(c)
	userId := claims["id"]

	stmtIns, err := db.Prepare("INSERT INTO FavoriteContent (user_id, content_id) VALUES( ?, ? )")
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error handling request."})
		log.Println(err)
		return
	}
	defer stmtIns.Close()

	_, err = stmtIns.Exec(userId, request.ContentId)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error handling request."})
		log.Println(err)
		return
	}

	c.JSON(200, gin.H{"error": nil})
}

func removeFavorite(c *gin.Context) {
	var request FavoriteRequest

	if err := c.ShouldBindJSON(&request); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid parameters."})
		log.Println(err)
		return
	}

	claims := jwt.ExtractClaims(c)
	userId := claims["id"]

	stmtDel, err := db.Prepare("DELETE FROM FavoriteContent WHERE user_id = ? AND content_id = ?")
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error handling request."})
		log.Println(err)
		return
	}
	defer stmtDel.Close()

	_, err = stmtDel.Exec(userId, request.ContentId)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error handling request."})
		log.Println(err)
		return
	}

	c.JSON(200, gin.H{"error": nil})
}

func registerPushNotifications(c *gin.Context) {
	var request RegisterPushNotificationsRequest

	if err := c.ShouldBindJSON(&request); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid parameters."})
		log.Println(err)
		return
	}

	claims := jwt.ExtractClaims(c)
	userId := claims["id"]

	stmtIns, err := db.Prepare("INSERT INTO UserPushNotificationToken (user_id, token) VALUES( ?, ? )")
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error handling request."})
		log.Println(err)
		return
	}
	defer stmtIns.Close()

	_, err = stmtIns.Exec(userId, request.Token)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error handling request."})
		log.Println(err)
		return
	}

	c.JSON(200, gin.H{"error": nil})
}

func createTodoList(c *gin.Context) {
	var request TodoRequest

	if err := c.ShouldBindJSON(&request); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid parameters."})
		log.Println(err)
		return
	}

	claims := jwt.ExtractClaims(c)
	userId := claims["id"]

	stmtIns, err := db.Prepare("INSERT INTO TodoList (name, checked, check_list_id, url, notes, user_id, alert) VALUES( ?, ?, ?, ?, ?, ?, ? )")
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error handling request."})
		log.Println(err)
		return
	}
	defer stmtIns.Close()

	res, err := stmtIns.Exec(request.Name, request.Checked, request.Check_list_id, request.Url, request.Notes, userId, request.Alert)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error handling request."})
		log.Println(err)
		return
	}

	id, err := res.LastInsertId()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error handling request."})
		log.Println(err)
		return
	}

	todoRequest := &TodoRequest{
		Todo_list_id:  uint64(id),
		Name:          request.Name,
		Checked:       request.Checked,
		Check_list_id: request.Check_list_id,
		Url:           request.Url,
		Notes:         request.Notes,
		UserId:        userId.(string),
		Alert:         request.Alert,
	}

	c.JSON(200, gin.H{"logData": todoRequest, "error": nil})
}

func updateTodoList(c *gin.Context) {
	var request TodoRequest

	if err := c.ShouldBindJSON(&request); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid parameters."})
		log.Println(err)
		return
	}

	claims := jwt.ExtractClaims(c)
	userId := claims["id"]

	log.Println(request)

	stmtUpd, err := db.Prepare("UPDATE TodoList SET name = ?, checked = ?, check_list_id = ?, url = ?, notes = ?, user_id = ?, alert = ? WHERE todo_list_id = ?")
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error handling request."})
		log.Println(err)
		return
	}
	defer stmtUpd.Close()

	_, err = stmtUpd.Exec(request.Name, request.Checked, request.Check_list_id, request.Url, request.Notes, userId, request.Alert, request.Todo_list_id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error handling request."})
		log.Println(err)
		return
	}

	todoRequest := &TodoRequest{
		Todo_list_id:  request.Todo_list_id,
		Name:          request.Name,
		Checked:       request.Checked,
		Check_list_id: request.Check_list_id,
		Url:           request.Url,
		Notes:         request.Notes,
		UserId:        userId.(string),
		Alert:         request.Alert,
	}

	c.JSON(201, gin.H{"logData": todoRequest, "error": nil})
}

func delTodoList(c *gin.Context) {
	var request TodoRequest

	if err := c.ShouldBindJSON(&request); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid parameters."})
		log.Println(err)
		return
	}

	claims := jwt.ExtractClaims(c)
	userId := claims["id"]

	log.Println(userId)

	stmtDel, err := db.Prepare("DELETE FROM TodoList WHERE todo_list_id = ?")
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error handling request."})
		log.Println(err)
		return
	}
	defer stmtDel.Close()

	_, err = stmtDel.Exec(request.Todo_list_id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error handling request."})
		log.Println(err)
		return
	}

	c.JSON(200, gin.H{"error": nil})
}

func createCheckList(c *gin.Context) {
	var request CheckListRequest

	if err := c.ShouldBindJSON(&request); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid parameters."})
		log.Println(err)
		return
	}

	claims := jwt.ExtractClaims(c)
	userId := claims["id"]

	log.Println(userId)

	stmtIns, err := db.Prepare("INSERT INTO CheckList (name) VALUES( ? )")
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error handling request."})
		log.Println(err)
		return
	}
	defer stmtIns.Close()

	res, err := stmtIns.Exec(request.Name)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error handling request."})
		log.Println(err)
		return
	}

	id, err := res.LastInsertId()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error handling request."})
		log.Println(err)
		return
	}

	checkListRequest := &CheckListRequest{
		Check_list_id: uint64(id),
		Name:          request.Name,
	}

	c.JSON(200, gin.H{"logData": checkListRequest, "error": nil})
}

func main() {
	var err error

	// // To check the token is valid
	// pushToken, err := expo.NewExponentPushToken("ExponentPushToken[VJs59OBdprwvutvDploJ9U]")
	// if err != nil {
	//     panic(err)
	// }

	// // Create a new Expo SDK client
	// client := expo.NewPushClient(nil)

	// // Publish message
	// response, err := client.Publish(
	//     &expo.PushMessage{
	//         To: pushToken,
	//         Body: "This is a test notification",
	//         Data: map[string]string{"withSome": "data"},
	//         Sound: "default",
	//         Title: "Notification Title",
	//         Priority: expo.DefaultPriority,
	//     },
	// )
	// // Check errors
	// if err != nil {
	//     panic(err)
	//     return
	// }
	// // Validate responses
	// if response.ValidateResponse() != nil {
	//     fmt.Println(response.PushMessage.To, "failed")
	// }

	flag.Parse()

	if *isLocal {
		ROOT_URL = "localhost"
	}

	// Initiate the proxy server.
	go func() {
		if *isLocal {
			return
		}

		log.Fatal(http.ListenAndServe(":80", http.HandlerFunc(redirToHTTPS)))
	}()

	db, err = sql.Open("mysql", "root:1987211!@/qolty")
	if err != nil {
		log.Fatal("Error opening mysql DB: ", err.Error())
	}
	defer db.Close()

	err = db.Ping()
	if err != nil {
		log.Fatal("Error pinging mysql DB: ", err.Error())
	}

	// Initiate the HTTPS server.
	router := gin.Default()

	// TODO: try later with https
	// securityConfig := secure.DefaultConfig()
	// router.Use(secure.New(securityConfig))

	var identityKey = "id"

	// the jwt middleware
	authMiddleware, err := jwt.New(&jwt.GinJWTMiddleware{
		Realm:       "",
		Key:         []byte("secret key"),
		Timeout:     time.Hour * 24,
		MaxRefresh:  time.Hour,
		IdentityKey: identityKey,
		PayloadFunc: func(data interface{}) jwt.MapClaims {
			if v, ok := data.(*User); ok {
				return jwt.MapClaims{
					identityKey: v.UserId,
				}
			}
			return jwt.MapClaims{}
		},
		IdentityHandler: func(c *gin.Context) interface{} {
			claims := jwt.ExtractClaims(c)
			return &User{
				UserId: claims["id"].(string),
			}
		},
		Authenticator: func(c *gin.Context) (interface{}, error) {
			var loginVals Login
			if err := c.ShouldBindJSON(&loginVals); err != nil {
				return "", jwt.ErrMissingLoginValues
			}

			email := strings.ToLower(loginVals.Email)
			password := loginVals.Password

			hashedPass, publicId, err := userDataByEmail(email)
			if err != nil {
				log.Println(err)
				return nil, jwt.ErrFailedAuthentication
			}

			if !comparePasswords(hashedPass, password) {
				return nil, jwt.ErrFailedAuthentication
			}

			return &User{
				UserId: publicId,
			}, nil
		},
		Authorizator: func(data interface{}, c *gin.Context) bool {
			// TODO: Put logic here to separate logic for patients, doctors, admins, etc.
			// Only doctors can access certain routes, etc.
			if _, ok := data.(*User); ok {
				// log.Println(v.UserId)
				return true
			}

			return false
		},
		Unauthorized: func(c *gin.Context, code int, message string) {
			c.JSON(code, gin.H{
				"code":    code,
				"message": message,
			})
		},
		// TokenLookup is a string in the form of "<source>:<name>" that is used
		// to extract token from the request.
		// Optional. Default value "header:Authorization".
		// Possible values:
		// - "header:<name>"
		// - "query:<name>"
		// - "cookie:<name>"
		// - "param:<name>"
		TokenLookup: "header: Authorization, query: token, cookie: jwt",
		// TokenLookup: "query:token",
		// TokenLookup: "cookie:token",

		// TokenHeadName is a string in the header. Default value is "Bearer"
		TokenHeadName: "Bearer",

		// TimeFunc provides the current time. You can override it to use another time value. This is useful for testing or if your server uses a different time zone than your tokens.
		TimeFunc: time.Now,
	})
	if err != nil {
		log.Fatal("JWT Error:" + err.Error())
	}

	router.GET("/", func(c *gin.Context) {
		ua := user_agent.New(c.Request.UserAgent())
		log.Println(c.Request.UserAgent())
		log.Println(ua)
		log.Println(ua.Mobile())
		log.Println(ua.Platform())
		log.Println(ua.OS())
		c.JSON(http.StatusOK, &TestResponse{"hello world"})
	})

	nicu_router := router.Group("/nicu/v1")
	{
		nicu_router.GET("/", func(c *gin.Context) {
			c.JSON(http.StatusOK, &TestResponse{"hello nicu"})
		})
		nicu_router.POST("/validateStudyID", validateStudyID)
		nicu_router.POST("/register", registerUser)
		nicu_router.POST("/login", authMiddleware.LoginHandler)
	}

	nicu_router.Use(authMiddleware.MiddlewareFunc())
	{
		nicu_router.GET("/content", getContent)
		nicu_router.POST("/moodLog", moodLog)
		nicu_router.POST("/moodUpdate", moodUpdate)
		nicu_router.POST("/addFavorite", addFavorite)
		nicu_router.POST("/removeFavorite", removeFavorite)
		nicu_router.POST("/registerPushNotifications", registerPushNotifications)
		nicu_router.POST("/createTodoList", createTodoList)
		nicu_router.POST("/delTodoList", delTodoList)
		nicu_router.POST("/updateTodoList", updateTodoList)
		nicu_router.POST("/createCheckList", createCheckList)
		nicu_router.POST("/changePassword", changePassword)
		nicu_router.POST("/addDiagnosis", addDiagnosis)
		nicu_router.POST("/delDiagnosis", delDiagnosis)
		nicu_router.POST("/editDiagnosis", editDiagnosis)
		nicu_router.POST("/addMedication", addMedication)
		nicu_router.POST("/editMedication", editMedication)
		nicu_router.POST("/delMedication", delMedication)
		nicu_router.POST("/addDoctor", addDoctor)
		nicu_router.POST("/editDoctor", editDoctor)
		nicu_router.POST("/delDoctor", delDoctor)
	}

	if *isLocal {
		router.Run(":80")
		gin.SetMode(gin.DebugMode)
	} else {
		gin.SetMode(gin.ReleaseMode)
		log.Fatal(autotls.Run(router, "api.qolty.com"))
	}
}
