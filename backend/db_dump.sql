-- MySQL dump 10.13  Distrib 8.0.13, for macos10.14 (x86_64)
--
-- Host: localhost    Database: qolty
-- ------------------------------------------------------
-- Server version	8.0.13

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8mb4 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Baby`
--

DROP TABLE IF EXISTS `Baby`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `Baby` (
  `baby_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `dob` varchar(32) DEFAULT NULL,
  `parent_id` int(10) unsigned NOT NULL,
  `public_id` varchar(32) DEFAULT NULL,
  PRIMARY KEY (`baby_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Baby`
--

LOCK TABLES `Baby` WRITE;
/*!40000 ALTER TABLE `Baby` DISABLE KEYS */;
INSERT INTO `Baby` VALUES (1,'Sanchez Jones','10/20/2018',28,'oCmK2B9MfGoL8xe5y7VChcLsjilRg9xe'),(2,'Alex','10/23/1992',29,'s6okwX0q6DPW1QAJSa7xHW6Cj8cRg6j7'),(3,'Baby Sanchez','10/23/1992',30,'f0126wOvDxBMH5K9GPFNE8k5EH7sdLYf'),(4,'Alex Wormuth','10/23/1993',31,'EZCQpIs8fPLBPXWO8lM2gPV0dN4Mctk9');
/*!40000 ALTER TABLE `Baby` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Content`
--

DROP TABLE IF EXISTS `Content`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `Content` (
  `content_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `url` varchar(255) NOT NULL,
  `format` varchar(20) DEFAULT NULL,
  `duration` varchar(20) NOT NULL,
  `categories` varchar(500) NOT NULL,
  `tags` varchar(500) NOT NULL,
  PRIMARY KEY (`content_id`)
) ENGINE=InnoDB AUTO_INCREMENT=259 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Content`
--

LOCK TABLES `Content` WRITE;
/*!40000 ALTER TABLE `Content` DISABLE KEYS */;
INSERT INTO `Content` VALUES (161,'Understanding Equipment in the NICU','This handout describes the most common equipment used within a NICU.','http://www.nicu-pet.com/wp-content/uploads/2017/01/Equipment-in-the-NICU-English.pdf','Article','3','Equipment,Medical History','equipment,NICU'),(162,'Understanding Periventricular Leukomalacia (PVL)','This handout defines PVL, explains its causes, and lists its risk factors, methods of diagnosis, and symptoms. ','http://www.nicu-pet.com/wp-content/uploads/2017/01/PVL-English.pdf','Article','2','Medical History,Diagnoses','PVL,Periventricular Leukomalacia,brain,development '),(163,'Understanding Vaccinations','This handout lists what vaccinations are needed at birth, at one month of age, and at two months of age. ','http://www.nicu-pet.com/wp-content/uploads/2017/01/Vaccinations-English.pdf','Article','2','Immunizations,Routine Care','vaccines ,Hepatitis B,Rotavirus,Diphtheria, Tetanus, Pertussis,Hib,Pneumococcal disease'),(164,'Infant Transport','This handout explains how babies are transported between NICUs. ','http://www.nicu-pet.com/wp-content/uploads/2017/01/Infant-Transport-English.pdf','Article','2','Routine Care,Pediatrician','transport,consent,infant ID'),(165,'Persistent Pulmonary Hypertension of the Newborn (PPHN)','This handout explains persistent PPHN, its symptoms, causes, methods of diagnosis, and treatments. ','http://www.nicu-pet.com/wp-content/uploads/2017/01/PPHN-English.pdf','Article','2','Medical History,Diagnoses','Persistent pulmonary hypertension of\nthe newborn,PPHN,hypertension,oxygen,tachypnea, retractions, cyanosis,nitric oxide, surfactant, CPAP, ECMO'),(166,'Bronchopulmonary dysplasia','This handout defines bronchopulmonary dysplasia, who is at risk, how it is diagnosed, and how it is treated.','http://www.nicu-pet.com/wp-content/uploads/2017/01/BPD-English.pdf','Article','3','Medical History,Diagnoses','Bronchopulmonary dysplasia,BPD,lungs,treatment,diagnose'),(167,'Respiratory Distress Syndrome (RDS)','This handout defines RDS, lists its causes, and explains how it is treated. ','http://www.nicu-pet.com/wp-content/uploads/2017/01/RDS-English.pdf','Article','','Medical History,Diagnoses','Respiratory distress syndrome ,RDS,surfactant,lungs,CPAP,oxygenation index'),(168,'Hypoxic Respiratory Failure (HRF)','This handout defines HRF, lists its causes, and explains how it is treated. ','http://www.nicu-pet.com/wp-content/uploads/2017/01/HRF-English.pdf','Article','','Medical History,Diagnoses','Hypoxic respiratory failure ,HRF,hypoxia,CPAP,mechanical ventilator '),(169,'Jaundice','This handout defines jaundice, details its causes, lists contributing factors, and explains treatment. ','http://www.nicu-pet.com/wp-content/uploads/2017/01/Jaundice-English.pdf','Article','2','Medical History,Diagnoses','bilirubin,hyperbilirubinemia,liver,phototherapy,transfusion'),(170,'Retinopathy of Prematurity (ROP)','This handout defines ROP, lists methods of diagnosis, describes an eye exam, lists the stages of ROP, and explains how it is treated. ','http://www.nicu-pet.com/wp-content/uploads/2017/01/ROP-English.pdf','Article','2','Medical History,Diagnoses','Retinopathy of Prematurity ,ROP,retina ,ophthalmology,laser therapy'),(171,'Patent Ductus Arteriosus (PDA)','This handout defines PDA, states how it is diagnosed, and explains how it is treated. ','http://www.nicu-pet.com/wp-content/uploads/2017/01/PDA-English.pdf','Article','2','Medical History,Diagnoses','Patent ductus arteriosus,PDA,congenital heart defect'),(172,'Apnea of Prematurity','This handout defines apnea, lists contributing factors, and explains how it is treated. ','http://www.nicu-pet.com/wp-content/uploads/2017/01/Apnea-of-Prematurity-English.pdf','Article','2','Medical History,Diagnoses','apnea ,breathing,anemia,CPAP, ventilator '),(173,'Necrotizing Enterocolitis (NEC)','This handout defines NEC, explains how it is caused, describes it symptoms, and details how it is treated. ','http://www.nicu-pet.com/wp-content/uploads/2017/01/NEC-English.pdf','Article','2','Medical History,Diagnoses','Necrotizing enterocolitis,NEC,chorioamnionitis,diarrhea, vomiting ,antibiotics,peritonitis'),(174,'Sepsis in Newborns','This handout defines sepsis, differentiates late onset sepsis from early onset sepsis, lists its symptoms, and explains how it is treated. ','http://www.nicu-pet.com/wp-content/uploads/2017/01/Sepsis-English.pdf','Article','2','Medical History,Diagnoses','sepsis,chorioamnionitis,infection,CPAP, ventilator '),(175,'Intraventricular Hemorrhage (IVH)','This handout defines IVH, and lists its symptoms, risk factors, methods of diagnosis, and treatments. ','http://www.nicu-pet.com/wp-content/uploads/2017/01/IVH-English.pdf','Article','2','Medical History,Diagnoses','intraventricular hemorrhage,IVH,brain,hydrocephalus,PVL'),(176,'Gastroesophageal Reflux (GER)','This handout defines GER, lists its causes, symptoms, and treatments. ','http://www.nicu-pet.com/wp-content/uploads/2017/01/GERD-English-.pdf','Article','2','Medical History,Diagnoses','Gastroesophageal Reflux,GER,esophagus, stomach,impaired sphincter '),(177,'Understanding newborn screening tests for your baby','This website defines newborn screening, explains when/how it is done, and lists health conditions it tests for.  ','https://www.marchofdimes.org/baby/newborn-screening-tests-for-your-baby.aspx','Link','2','Routine Care,Newborn Screening','Newborn Screening,screening,PKU'),(178,'Care Mapping','This website defines care mapping, and provides links to care mapping guides/research.','http://www.childrenshospital.org/integrated-care-program/care-mapping','Link','2','Care Mapping,Complex Care','care,map,mapping,coordination'),(179,'Administering medications (orally) to your baby','This video demonstrates how to administer oral medications to infants, first, via usage of a pacifier and syringe, and second, via a bottle containing breast milk or formula. ','https://vimeo.com/292650484','Video','2','Medications,Formula','medications,administering,oral'),(180,'Basic gastrostomy tube care for your baby','This video demonstrates how to clean a g-tube when it is not completely healed, or needs additional cleaning outside of regular bathing.','https://vimeo.com/292650639','Video','2','Equipment,Routine Care','Gastrostomy,G-tube,care'),(181,'Respiratory Syncytial Virus','This handout defines Respiratory Syncytial Virus (RSV) and lists its symptoms, complications, and treatment.','http://www.nicu-pet.com/wp-content/uploads/2017/01/RSV-English.pdf','Article','2','Medical History,Diagnoses','Respiratory Syncytial Virus,RSV,virus,infection'),(182,'Hypoxic Ischemic Encephalopathy','This handout explains Hypoxic Ischemic Encephalopathy, as well as its symptoms and treatments. ','http://www.nicu-pet.com/wp-content/uploads/2017/01/HIE-English.pdf','Article','2','Medical History,Diagnoses','Hypoxic Ischemic Encephalopathy,HIE,neonatal encephalopathy,brain'),(183,'Neonatal Seizures','This handout describes different types of neonatal seizures and explains the causes and treatment of seizures.','http://www.nicu-pet.com/wp-content/uploads/2017/01/NS-English.pdf','Article','2','Medical History,Diagnoses','seizures,brain,motor,treatment'),(184,'Transient Tachypnea of the Newborn','This handout describes the symptoms of transient tachypnea and explains the symptoms and treatment.','http://www.nicu-pet.com/wp-content/uploads/2017/01/TTN-English.pdf','Article','2','Medical History,Diagnoses','transient tachypnea,TTN,lungs,breathing,treatment'),(185,'Nutrition in the NICU','This handout discusses nutrition for newborns, going over both enteral and parenteral feeding techniques.','http://www.nicu-pet.com/wp-content/uploads/2017/01/Nutrition-English.pdf','Article','3','Routine Care,Equipment','nutrition,feeding,NG tube,OG tube,Total Parenteral Nutrition,TPN'),(186,'Neonatal Abstinence Syndrome','This handout explains the causes Neonatal Abstinence Syndrome, the symptoms, and the treatment.','http://www.nicu-pet.com/wp-content/uploads/2017/01/NAS-English.pdf','Article','2','Medical History,Diagnoses','neonatal abstinence syndrome,NAS,drugs,brain'),(187,'Gestational Diabetes','This handout explains the effects of gestational diabetes during pregnancy on the newborn baby.','http://www.nicu-pet.com/wp-content/uploads/2017/01/GD-English.pdf','Article','3','Medical History,Diagnoses','gestational diabetes,glucose,insulin,pregnancy'),(188,'Your Late Preterm Baby','This handout defines a late preterm infant and explains care for these infants, as well as any complications they may have. ','http://www.nicu-pet.com/wp-content/uploads/2017/01/Your-Late-Preterm-Baby-English.pdf','Article','4','Routine Care,Parent Infant Bonding','late preterm infants,LPI,feeding,complications'),(189,'How to Communicate with Your Baby’s Care Team','This handout lists 10 different communication tips to help talk to the baby\'s care team.','http://www.nicu-pet.com/wp-content/uploads/2017/01/Communication-English.pdf','Article','3','Routine Care,Care Mapping','communication,care,team'),(190,'When Will We Go Home?','This handout explains the discharge process and reasons why babies may be kept longer in the hospital.','http://www.nicu-pet.com/wp-content/uploads/2017/01/Home-English.pdf','Article','3','Routine Care,Medical Home','home,discharge'),(191,'Anemia','This handout describes three different causes of anemia, how doctors diagnose anemia, and treatments for anemia.','http://www.nicu-pet.com/wp-content/uploads/2017/01/Anemia-English.pdf','Article','2','Medical History,Diagnoses','anemia,blood'),(192,'Developmental Care','This handout defines developmental care and gives parents tips on how to interact with their newborn.','http://www.nicu-pet.com/wp-content/uploads/2017/01/Developmental-Care-English.pdf','Article','2','Routine Care,Parent Infant Bonding','developmental care,behavior'),(193,'Newborn Screening','This handout explains newborn screening and lists some of the diseases that are screened for.','http://www.nicu-pet.com/wp-content/uploads/2017/01/Newborn-Screening-English.pdf','Article','2','Newborn Screening,Routine Care','newborn screening ,newborn,screening,genetic,congenital,hearing'),(194,'Meconium Aspiration Syndrome','This handout explains the causes, symptoms, diagnosis, and treatment of Meconium Aspiration Syndrome','http://www.nicu-pet.com/wp-content/uploads/2017/01/MAS-English.pdf','Article','2','Medical History,Diagnoses','meconium aspiration syndrome,MAS,lungs'),(195,'Spontaneous Intestinal Perforation','This handout defines Spontaneous Intestinal Perforation and explains its symptoms and treatment.','http://www.nicu-pet.com/wp-content/uploads/2017/01/SIP-English.pdf','Article','2','Medical History,Diagnoses','spontaneous intestinal perforation,intestines,SIP'),(196,'Osteopenia in Preterm Infants','This handout describes the symptoms of osteopenia and how it is treated in preterm infants.','http://www.nicu-pet.com/wp-content/uploads/2017/01/Osteopenia-English.pdf','Article','2','Medical History,Diagnoses','osteopenia,bones'),(197,'A dad\'s role in the NICU','This article lists emotions commonly felt by fathers of babies in a NICU, suggests how to cope with those feelings, and recommends how to be supportive of the baby\'s mother.  ','https://www.marchofdimes.org/complications/a-dad\'s-role-in-the-nicu.aspx','Article','3','Care Mapping,Parent Infant Bonding','fathers ,emotions ,support '),(198,'Car safety seats: Tips for parents of preemies','This article explains how to choose a car seat, and how to place an infant in a car seat.','https://www.marchofdimes.org/complications/car-safety-seats-tips-for-parents-of-preemies.aspx','Article','3','Car Seat,Routine Care','car seat,safety'),(199,'Caring for multiples','This article briefly addresses some challenges of having multiple babies in the NICU, and offers tips frow ho to navigate them. ','https://www.marchofdimes.org/complications/caring-for-multiples.aspx','Article','1','Parent Infant Bonding,Routine Care','multiples,feeding'),(200,'Child care after the NICU','This article provides guidance for choosing the best type of day care for a premature infant discharged from the NICU. ','https://www.marchofdimes.org/complications/child-care-after-the-nicu.aspx','Article','1','Medical Home,Routine Care','day care,childcare ,RSV'),(201,'Common conditions treated in the NICU','This article lists a wide array of common conditions treated in the NICU','https://www.marchofdimes.org/complications/common-conditions-treated-in-the-nicu.aspx','Article','6','Complex Care,Routine Care','heart defects,feeding,common conditions '),(202,'Common NICU equipment','This article lists and describes 24 types of common NICU equipment. ','https://www.marchofdimes.org/complications/common-nicu-equipment.aspx','Article','4','Equipment,','equipment'),(203,'Common tests in the NICU','This article lists and describes 12 types of common tests that are done in the NICU.','https://www.marchofdimes.org/complications/common-tests-in-the-nicu.aspx','Article','3','Routine Care,Newborn Screening','tests,consent'),(204,'Communicating with your baby’s health care providers in the NICU','This article discusses how you can care for your baby in the NICU, what questions you can ask about your baby, how you can share information with providers, and how you can keep track of your baby\'s medical information.','https://www.marchofdimes.org/complications/communicating-with-your-babys-health-care-providers-in-the-nicu.aspx','Article','3','Care Mapping,Pediatrician','questions,communication,care'),(205,'Continuing medical care after the NICU','This article provides ways to maintain a baby\'s health after he or she is discharged from the NICU.','https://www.marchofdimes.org/complications/continuing-medical-care-after-the-nicu.aspx','Article','1','Routine Care,Medical Home','vaccinations ,RSV,development,milestones'),(206,'Coping with stress in the NICU','This article discusses feelings commonly felt by parents with babies in a  NICU, addresses the importance of self care, and suggest ways that parents can reach out to family for help. ','https://www.marchofdimes.org/complications/coping-with-stress-in-the-nicu.aspx','Article','3','Therapy,Parent Support Groups','coping,stress,feelings'),(207,'Feeding your baby formula after the NICU','This article explains how to find the proper nipples and bottles, as well as how to correctly warm a baby\'s bottle.','https://www.marchofdimes.org/complications/feeding-your-baby-formula-after-the-nicu.aspx','Article','1','Routine Care,Formula','feeding ,formula'),(208,'Feeding your baby in the NICU','This article discusses what babies eat, how they are fed in the NICU, how to pump breast milk prior to breastfeeding, and troubleshooting for when their is difficulty providing sufficient breast milk.','https://www.marchofdimes.org/complications/feeding-your-baby-in-the-nicu.aspx','Article','3','Routine Care,Parent Infant Bonding','feeding ,breastfeeding,breast milk,pumping '),(209,'Getting ready to go home from the NICU','This article discusses different ways that parents can prepare to be discharged from the NICU and things to expect when they bring their baby home.','https://www.marchofdimes.org/complications/getting-ready-to-go-home-from-the-NICU.aspx','Article','3','Routine Care,Parent Infant Bonding','discharge,medical equipment,medical home'),(210,'Getting services for your baby after the NICU','This article talks about some of the developmental delays that children from the NICU may face and how parents can take advantage of early intervention programs.','https://www.marchofdimes.org/complications/getting-services-for-your-baby-after-the-nicu.aspx','Article','2','Routine Care,Specialty Care','early intervention program,development delays'),(211,'Grandparents and the NICU','This article details emotions that are common for grandparents while their grandchild is in the NICU and ways that the grandparents can help.','https://www.marchofdimes.org/complications/grandparents-and-the-nicu.aspx','Article','3','Care Mapping,Parent Infant Bonding','grandparents,emotion,support'),(212,'Including your other children in the NICU','This article details ways to help your other children cope with their sibling being in the NICU.','https://www.marchofdimes.org/complications/including-your-other-children-in-the-nicu.aspx','Article','3','Care Mapping,Parent Infant Bonding','children,visitors '),(213,'Learning your baby\'s cues','This article talks about the different cues or signals your baby uses to communicate with you and different ways you can respond to your baby.','https://www.marchofdimes.org/complications/learning-your-baby-s-cues.aspx','Article','3','Parent Infant Bonding,Routine Care','cues,bonding'),(214,'Life after the NICU','This article talks about different ways parents can help other parents whose children are currently in the NICU.','https://www.marchofdimes.org/complications/life-after-the-nicu.aspx','Article','2','Parent Support Groups,','parent support groups'),(215,'Medical equipment at home after the NICU','This article talks about three different types of medical equipment that may be in the home: apnea monitor, feeding tubes and syringes, and oxygen.','https://www.marchofdimes.org/complications/medical-equipment-at-home-after-the-nicu.aspx','Article','3','Medical Home,Equipment','equipment,feeding,apnea,oxygen'),(216,'Medications after the NICU','This article lists the different aspects of administering medications that parents need to be aware of before discharge.','https://www.marchofdimes.org/complications/medications-after-the-nicu.aspx','Article','2','Medications,Routine Care','medications'),(217,'NICU staff','This article describes all the different individuals who work at the NICU.','https://www.marchofdimes.org/complications/nicu-staff.aspx','Article','4','Care Mapping,Specialty Care','NICU staff,specialist,social worker,pediatrician,neonatologist'),(218,'Paying for NICU care','This article describes the different kinds of ways that parents can pay for the NICU.','https://www.marchofdimes.org/complications/paying-for-nicu-care.aspx','Article','2','Insurance,SSI','private medical insurance,medicaid,SSI'),(219,'Touching and holding your baby in the NICU','This article describes kangaroo care which is when the baby and parent are skin to skin.','https://www.marchofdimes.org/complications/touching-and-holding-your-baby-in-the-nicu.aspx','Article','3','Parent Infant Bonding,Routine Care','kangaroo care,skin-to-skin care,bonding'),(220,'Visitors and visiting after coming home from the NICU','This article discusses ways to keep your baby healthy around visitors in your home.','https://www.marchofdimes.org/complications/visitors-and-visiting-after-coming-home-from-the-nicu.aspx','Article','1','Medical Home,Care Mapping','visitors'),(221,'Your baby\'s NICU stay','This article gives a brief overview of what parents can expect after learning that their baby is in the NICU.','https://www.marchofdimes.org/complications/your-baby-s-nicu-stay.aspx','Article','3','Routine Care,Care Mapping','NICU,pediatrician,neonatologist'),(222,'How You Can Participate in the Care of Your Baby in the NICU','This article lists different ways that parents can be a part of their newborn\'s care while in the NICU.','https://www.healthychildren.org/English/ages-stages/baby/preemie/Pages/How-You-Can-Participate-in-the-Care-of-Your-Baby-in-the-NICU.aspx','Article','3','Parent Infant Bonding,Routine Care','NICU,routine care'),(223,'NICU Medical Team','This article lists and explains the different medical professionals that parents may encounter during their infant\'s stay in the NICU.','https://www.healthychildren.org/English/ages-stages/baby/preemie/Pages/NICU-Medical-Team.aspx','Article','5','Care Mapping,Specialty Care','NICU staff,neonatologist,pediatrician,fellow,resident'),(224,'NICU Nursing Team','This article lists and explains the different types of nurses that are involved in neonatal care.','https://www.healthychildren.org/English/ages-stages/baby/preemie/Pages/NICU-Nursing-Team.aspx','Article','3','Care Mapping,Specialty Care','NICU staff,nurse,registered nurse,licensed practical nurse,clinical nurse specialist'),(225,'NICU Support Team','This article describes the different types of professionals that may be a part of the NICU support team.','https://www.healthychildren.org/English/ages-stages/baby/preemie/Pages/NICU-Support-Team.aspx','Article','6','Care Mapping,Specialty Care','NICU staff,pharmacist,nutritionist,social worker,therapist,case worker'),(226,'Preemie Milestones','This article lists the different developmental milestones for children.','https://www.healthychildren.org/English/ages-stages/baby/preemie/Pages/Preemie-Milestones.aspx','Article','10','Routine Care,Pediatrician','developmental care,milestones,motor,language,social/emotional,language'),(227,'Preemie Sleep Patterns','This article discusses the sleep patterns of premature babies and lists ways to improve your child\'s sleep routine.','https://www.healthychildren.org/English/ages-stages/baby/preemie/Pages/Preemie-Sleep-Patterns.aspx','Article','2','Safe Sleep,Routine Care','sleep,routine'),(228,'The Intermediate Care Experience','This article explains intermediate care between the NICU and home and lists ways to help parents cope with the adjustment.','https://www.healthychildren.org/English/ages-stages/baby/preemie/Pages/The-Intermediate-Care-Experience.aspx','Article','5','Routine Care,Parent Infant Bonding','step-down,intermediate care'),(229,'Transitioning to a Crib in the NICU','This article explains why babies transition to a crib in the NICU.','https://www.healthychildren.org/English/ages-stages/baby/preemie/Pages/Transitioning-to-a-Crib.aspx','Article','1','Routine Care,Safe Sleep','crib,temperature,sleep'),(230,'Treatments & Tests Your Preemie May Not Need in the Hospital','This article explains the different tests and treatments that may be performed on your newborn in the NICU.','https://www.healthychildren.org/English/ages-stages/baby/preemie/Pages/Treatments-Tests-Your-Preemie-May-Not-Need-in-the-Hospital.aspx','Article','4','Newborn Screening,Routine Care','antibiotics,pneumograrms,X-rays,MRI'),(231,'Watching for Complications','This article explains complications that may occur and signs to look out for.','https://www.healthychildren.org/English/ages-stages/baby/preemie/Pages/Watching-for-Complications.aspx','Article','6','Medical History,Diagnoses','apnea ,bradycardia,infection,hernia,gastroesophageal reflux,anemia'),(232,'When Baby Needs Oxygen At Home','This article describes the different ways supplemental oxygen can be delivered at home.','https://www.healthychildren.org/English/ages-stages/baby/preemie/Pages/When-Baby-Needs-Oxygen-At-Home.aspx','Article','6','Medical Home,Equipment','oxygen,compressed gas,oxygen concentrator,liquid oxygen'),(233,'About Skin-to-Skin Care','This articles discusses the benefits of skin-to-skin care for infants. ','https://www.healthychildren.org/English/ages-stages/baby/preemie/Pages/About-Skin-to-Skin-Care.aspx','Article','2','Parent Infant Bonding,Medical Home','skin-to-skin,bonding,kangaroo care'),(234,'Apnea Monitors','This article exlians what apnea monitors are used for, how they are used, and how they can be transitioned into care when a premature infant is discharged from the NICU.','https://www.healthychildren.org/English/ages-stages/baby/preemie/Pages/Apnea-Monitors.aspx','Article','5','Medical Home,Complex Care','apnea ,sleep study,polysomnography,cardiorespiratory monitoring'),(235,'Baby-Wearing','This article discusses the benefits of safely wearing your baby in a front pouch, or wrap. ','https://www.healthychildren.org/English/ages-stages/baby/preemie/Pages/Baby-Wearing.aspx','Article','2','Parent Infant Bonding,Routine Care','baby-wearing ,parent-infant attachment '),(236,'Bringing Baby Home: Preparing Yourself, Your Home, and Your Family','This articles discusses factors to keep in mind when preparing to bring your baby home, such as emergenices, housecleaning, tobacco smoke, pets, siblings, and visitors.','https://www.healthychildren.org/English/ages-stages/baby/preemie/Pages/Bringing-Baby-Home-Preparing-Yourself-Your-Home-and-Your-Family.aspx','Article','4','Medical Home,Routine Care','preparation,house-cleaning,smoke'),(237,'Caring for a Premature Baby: What Parents Need to Know','This article describes characteristics of premature infants, how they will look, and how they will act, in addition to listing parental coping mechanisms for stress. ','https://www.healthychildren.org/English/ages-stages/baby/preemie/Pages/Caring-For-A-Premature-Baby.aspx','Article','5','Specialty Care,Complex Care','characteristics ,looks ,acts'),(238,'Common Parent Reactions to the NICU','This article discusses the feelng commonly felt by parents of infants in a NICU, including fear, anger, guilt, loss, and powerlessness. ','https://www.healthychildren.org/English/ages-stages/baby/preemie/Pages/Common-Parent-Reactions-to-the-NICU.aspx','Article','4','Parent Infant Bonding,Complex Care','emotions ,anger,fear,guilt,powerlessness'),(239,'Common Reasons for Rehospitalization','This article discusses the most commo causes of rehospitalization in premature infants. ','https://www.healthychildren.org/English/ages-stages/baby/preemie/Pages/Common-Reasons-for-Rehospitalization.aspx','Article','4','Complex Care,Medical Home','infectirons ,feeding,apnea,neurodevelopmental problems'),(240,'Corrected Age For Preemies','This article explains how to measure your infants\'s development , by taking into consideration date of birth, and due date. ','https://www.healthychildren.org/English/ages-stages/baby/preemie/Pages/Corrected-Age-For-Preemies.aspx','Article','3','Routine Care,Pediatrician','age,milestone ,date of birth,development '),(241,'Getting Ready to Leave the NICU','This article discusses six tests commonly done before a premature infant is discharged from the NICU.','https://www.healthychildren.org/English/ages-stages/baby/preemie/Pages/Getting-Ready-to-Leave-the-NICU.aspx','Article','3','Routine Care,Medical Home','discharge tests,eye exam,hearing test,Newborn Metabolic Screening,blood count,Sleep Study (Pneumogram)'),(242,'Going Home With Your Preemie','This article discusses what to expect when bringing a newly discharged premature infant home from the NICU. ','https://www.healthychildren.org/English/ages-stages/baby/preemie/Pages/Going-Home-With-Your-Preemie.aspx','Article','3','Medical Home,Parent Infant Bonding','CPR,questions,support,sleep'),(243,'Health Issues of Premature Babies','This article discusses five health issues experienced by premature infants, as well as thier treatments. ','https://www.healthychildren.org/English/ages-stages/baby/preemie/Pages/Health-Issues-of-Premature-Babies.aspx','Article','3','Complex Care,Care Mapping','Respiratory Distress Syndrome (RDS),Chronic Lung Disease/Bronchopulmonary Dysplasia (BPD),Apnea and Bradycardia,Retinopathy of Prematurity (ROP),jaundice '),(244,'Applying for Supplemental Security Income for your baby','','https://vimeo.com/292650938','Image/Video','3','Insurance & Finances,SSI','SSI,Supplemental Security Income,Financial assistance'),(245,'Applying for supplemental security income website','','https://www.ssa.gov/disabilityssi/apply-child.html','URL','20','Insurance & Finances,SSI','Apply,SSI,Supplemental Security Income'),(246,'CHLA Phone Number Directory','','https://www.chla.org/contact-us','URL','2','Healthcare Services Directory,','Phone Numbers,Directory,CHLA,Contact'),(247,'Regional Center Resource Booklet','','https://www.dropbox.com/s/zsr6vxbe03aqaqk/FDLRC%20FAMILY%20SERVICE%20GUIDE%20%281%29.pdf?dl=0','Text','20','Therapies/Regional Center,Therapy','Regional Center,Therapy,Accessing Regional Center'),(248,'Legal Help','','https://www.dropbox.com/s/nkzqis53r827iae/NLSLA%20-%20Free%20Legal%20Help%20-%20Eng-Spanish%20-%20Dec%202018.pdf?dl=0','Text','10','Insurance & Finances,','Legal Help,Legal Assistance'),(249,'Immigration Resources','','https://www.dropbox.com/s/rjhxu9c9wamq3wc/Immigration%20resources.pdf?dl=0','Text','10',',','Immigration Resources,Legal Assistance'),(250,'Disability Resources','','https://www.dropbox.com/s/kn1qa1jilb0hoxl/Additional%20RESOURCES%20%282019%29%20%281%29.docx?dl=0','Text','10','Therapies/Regional Center,Therapy','Disability,Vision Resources'),(251,'Welcome Video','','https://vimeo.com/312125236','Image/Video','2','Healthcare Services Directory,','Welcome,Navigating Resources'),(252,'Resource Packet','','https://www.dropbox.com/s/q5c26huy1tkxmp6/Resource%20Packet.pdf?dl=0','Text','10','Therapies/Regional Center,Therapy','Resource Packet'),(253,'Regional Center Informational Video','','https://vimeo.com/312203090','Image/Video','5','Therapies/Regional Center,Therapy','Regional Center Introduction'),(254,'Transportation Introductory Video','','https://vimeo.com/312203702','Image/Video','5','Transportation,','Transportation ,Transportation Resources'),(255,'Parent Support Group Login','','https://www.zoom.us/?zcid=1173&creative=85176081601&keyword=zoom&matchtype=e&network=g&device=c&gclid=EAIaIQobChMI0bD4uujy3QIVirXACh1TOwhzEAAYASAAEgJ_tPD_BwE','Link','','Parent Support Group Login,','Support ,Group,Telehealth ,Virtual'),(256,'Post partum Depression','','https://www.dropbox.com/s/rjhxu9c9wamq3wc/Immigration%20resources.pdf?dl=0','Article','10','Articles,','Post partum Depression,Sadness,Depression,Anxiety'),(257,'Parent Support Group Welcome','','https://vimeo.com/312198236','Video','2','Parent Support Group Login,Parent Support Group Login','Parent Support Welcome Video'),(258,'Mood Tracking Introduction','','https://vimeo.com/312198567','Video','2','Mood Tracker,Mood Tracker','Mood Tracking Introduction');
/*!40000 ALTER TABLE `Content` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `FavoriteContent`
--

DROP TABLE IF EXISTS `FavoriteContent`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `FavoriteContent` (
  `favorite_content_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` varchar(32) DEFAULT NULL,
  `content_id` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`favorite_content_id`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `FavoriteContent`
--

LOCK TABLES `FavoriteContent` WRITE;
/*!40000 ALTER TABLE `FavoriteContent` DISABLE KEYS */;
INSERT INTO `FavoriteContent` VALUES (26,'ETCeP3UfcsBJP9mE7VR4Fq9OL7hAod6P',162);
/*!40000 ALTER TABLE `FavoriteContent` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `LibraryCategory`
--

DROP TABLE IF EXISTS `LibraryCategory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `LibraryCategory` (
  `library_category_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `image` varchar(255) NOT NULL,
  PRIMARY KEY (`library_category_id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `LibraryCategory`
--

LOCK TABLES `LibraryCategory` WRITE;
/*!40000 ALTER TABLE `LibraryCategory` DISABLE KEYS */;
INSERT INTO `LibraryCategory` VALUES (1,'Care Mapping','https://s3.us-west-2.amazonaws.com/qolty/images/nicu/library/care-mapping.png'),(2,'Insurance','https://s3.us-west-2.amazonaws.com/qolty/images/nicu/library/insurance.png'),(3,'Medications','https://s3.us-west-2.amazonaws.com/qolty/images/nicu/library/medications.png'),(4,'Medical History','https://s3.us-west-2.amazonaws.com/qolty/images/nicu/library/medical-history.png'),(5,'Routine Care','https://s3.us-west-2.amazonaws.com/qolty/images/nicu/library/routine-care.png'),(6,'Equipment','https://s3.us-west-2.amazonaws.com/qolty/images/nicu/library/equipment.png'),(7,'Therapy','https://s3.us-west-2.amazonaws.com/qolty/images/nicu/library/therapy.png'),(8,'Directory','https://s3.us-west-2.amazonaws.com/qolty/images/nicu/library/directory.png'),(9,'Specialty Care','https://s3.us-west-2.amazonaws.com/qolty/images/nicu/library/specialty-care.png'),(10,'Pediatrician','https://s3.us-west-2.amazonaws.com/qolty/images/nicu/library/peditiatrician.png'),(11,'Medical Home','https://s3.us-west-2.amazonaws.com/qolty/images/nicu/library/medical-home.png'),(12,'Immunizations','https://s3.us-west-2.amazonaws.com/qolty/images/nicu/care-mapping1.png'),(13,'Advanced Directive/Palliative','https://s3.us-west-2.amazonaws.com/qolty/images/nicu/care-mapping1.png'),(14,'Formula','https://s3.us-west-2.amazonaws.com/qolty/images/nicu/care-mapping1.png'),(15,'Complex Care','https://s3.us-west-2.amazonaws.com/qolty/images/nicu/care-mapping1.png'),(16,'Parent Infant Bonding','https://s3.us-west-2.amazonaws.com/qolty/images/nicu/care-mapping1.png'),(17,'CPR Training','https://s3.us-west-2.amazonaws.com/qolty/images/nicu/care-mapping1.png'),(18,'Safe Sleep','https://s3.us-west-2.amazonaws.com/qolty/images/nicu/care-mapping1.png'),(19,'Car Seat','https://s3.us-west-2.amazonaws.com/qolty/images/nicu/care-mapping1.png'),(20,'Parent Support Groups','https://s3.us-west-2.amazonaws.com/qolty/images/nicu/care-mapping1.png'),(21,'Religious','https://s3.us-west-2.amazonaws.com/qolty/images/nicu/care-mapping1.png'),(22,'SSI','https://s3.us-west-2.amazonaws.com/qolty/images/nicu/care-mapping1.png'),(23,'Diagnoses','https://s3.us-west-2.amazonaws.com/qolty/images/nicu/care-mapping1.png'),(24,'Newborn Screening','https://s3.us-west-2.amazonaws.com/qolty/images/nicu/care-mapping1.png');
/*!40000 ALTER TABLE `LibraryCategory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `MoodLog`
--

DROP TABLE IF EXISTS `MoodLog`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `MoodLog` (
  `mood_log_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` varchar(32) DEFAULT NULL,
  `timestamp` datetime DEFAULT NULL,
  `baby_feeling` varchar(25) DEFAULT NULL,
  `personal_feeling` varchar(25) DEFAULT NULL,
  `reflection_environment` text,
  `reflection_focus` text,
  `reflection_clarity` text,
  PRIMARY KEY (`mood_log_id`)
) ENGINE=InnoDB AUTO_INCREMENT=62 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `MoodLog`
--

LOCK TABLES `MoodLog` WRITE;
/*!40000 ALTER TABLE `MoodLog` DISABLE KEYS */;
INSERT INTO `MoodLog` VALUES (53,'ETCeP3UfcsBJP9mE7VR4Fq9OL7hAod6P','2019-01-20 21:05:02','5','2','','',''),(54,'ETCeP3UfcsBJP9mE7VR4Fq9OL7hAod6P','2019-01-21 00:05:49','2','2','','',''),(55,'ETCeP3UfcsBJP9mE7VR4Fq9OL7hAod6P','2019-01-21 00:07:39','2','2','','',''),(56,'ETCeP3UfcsBJP9mE7VR4Fq9OL7hAod6P','2019-01-24 18:07:09','3','2','','',''),(57,'ETCeP3UfcsBJP9mE7VR4Fq9OL7hAod6P','2019-01-24 18:09:35','1','1','','',''),(58,'ETCeP3UfcsBJP9mE7VR4Fq9OL7hAod6P','2019-01-24 18:10:03','3','3','','',''),(59,'ETCeP3UfcsBJP9mE7VR4Fq9OL7hAod6P','2019-01-24 18:12:47','5','3','','',''),(60,'ETCeP3UfcsBJP9mE7VR4Fq9OL7hAod6P','2019-01-24 18:12:56','4','2','','',''),(61,'ETCeP3UfcsBJP9mE7VR4Fq9OL7hAod6P','2019-01-24 18:13:01','2','2','','','');
/*!40000 ALTER TABLE `MoodLog` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ResourceCategory`
--

DROP TABLE IF EXISTS `ResourceCategory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `ResourceCategory` (
  `resource_category_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `image` varchar(255) NOT NULL,
  PRIMARY KEY (`resource_category_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ResourceCategory`
--

LOCK TABLES `ResourceCategory` WRITE;
/*!40000 ALTER TABLE `ResourceCategory` DISABLE KEYS */;
INSERT INTO `ResourceCategory` VALUES (1,'Transportation','https://s3.us-west-2.amazonaws.com/qolty/images/nicu/resource/Transportation.png'),(2,'Housing','https://s3.us-west-2.amazonaws.com/qolty/images/nicu/resource/Housing.png'),(3,'Feeding','https://s3.us-west-2.amazonaws.com/qolty/images/nicu/resource/feeding.png'),(4,'Insurance & Finances','https://s3.us-west-2.amazonaws.com/qolty/images/nicu/resource/Insurance-&-Finances-.png'),(5,'Safety','https://s3.us-west-2.amazonaws.com/qolty/images/nicu/resource/Safety.png'),(6,'School/Education','https://s3.us-west-2.amazonaws.com/qolty/images/nicu/resource/School-Education-.png'),(7,'Healthcare Services Directory','https://s3.us-west-2.amazonaws.com/qolty/images/nicu/resource/Healthcare-Services-Directory-.png'),(8,'Therapies/Regional Center','https://s3.us-west-2.amazonaws.com/qolty/images/nicu/resource/Therapies-Regional-Center-.png');
/*!40000 ALTER TABLE `ResourceCategory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `CheckList`
--

DROP TABLE IF EXISTS `CheckList`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `CheckList` (
  `check_list_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`check_list_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `CheckList`
--

LOCK TABLES `CheckList` WRITE;
/*!40000 ALTER TABLE `CheckList` DISABLE KEYS */;
INSERT INTO `CheckList` VALUES (1,'Medical Discharge from the NICU'),(2,'Social services applications');
/*!40000 ALTER TABLE `CheckList` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `TodoList`
--

DROP TABLE IF EXISTS `TodoList`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `TodoList` (
  `todo_list_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `checked` tinyint(1) NOT NULL,
  `check_list_id` int(10) unsigned DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  `notes` varchar(255) DEFAULT NULL,
  `user_id` varchar(255) DEFAULT NULL,
  `alert` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`todo_list_id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `TodoList`
--

LOCK TABLES `TodoList` WRITE;
/*!40000 ALTER TABLE `TodoList` DISABLE KEYS */;
INSERT INTO `TodoList` VALUES (3,'Medications picked up from the pharmacy',0,1,'','','ETCeP3UfcsBJP9mE7VR4Fq9OL7hAod6P',''),(4,'Practice giving medication',0,1,'','','ETCeP3UfcsBJP9mE7VR4Fq9OL7hAod6P',''),(5,'Identify all vendors for equipment',0,1,'','','ETCeP3UfcsBJP9mE7VR4Fq9OL7hAod6P',''),(6,'Save all vendor phone numbers',0,1,'','','ETCeP3UfcsBJP9mE7VR4Fq9OL7hAod6P',''),(7,'Complete teaching for respiratory medications (oxygen, nebulizer, inhalers, etc)',0,1,'','','ETCeP3UfcsBJP9mE7VR4Fq9OL7hAod6P',''),(8,'Receive synagis vaccine',0,1,'','','ETCeP3UfcsBJP9mE7VR4Fq9OL7hAod6P',''),(9,'Received information for synagis vaccine',0,1,'','','ETCeP3UfcsBJP9mE7VR4Fq9OL7hAod6P',''),(10,'Order home equipment/supplies',0,1,'','','ETCeP3UfcsBJP9mE7VR4Fq9OL7hAod6P',''),(11,'Receive home equipment/supplies (delivery)',0,1,'','','ETCeP3UfcsBJP9mE7VR4Fq9OL7hAod6P',''),(12,'Order formula',0,1,'','','ETCeP3UfcsBJP9mE7VR4Fq9OL7hAod6P',''),(13,'Practiced formula mixing',0,1,'','','ETCeP3UfcsBJP9mE7VR4Fq9OL7hAod6P',''),(14,'Have copies of all regional center referrals',0,2,'','','ETCeP3UfcsBJP9mE7VR4Fq9OL7hAod6P',''),(15,'Complete 24 hour primary caregiver care',0,2,'','','ETCeP3UfcsBJP9mE7VR4Fq9OL7hAod6P',''),(16,'Have a copy of care plan/follow up plan',0,2,'','','ETCeP3UfcsBJP9mE7VR4Fq9OL7hAod6P',''),(17,'Entered names of all providers on my profile page',0,2,'','','ETCeP3UfcsBJP9mE7VR4Fq9OL7hAod6P',''),(18,'Entered names of all my vendors on my profile page',0,2,'','','ETCeP3UfcsBJP9mE7VR4Fq9OL7hAod6P',''),(19,'Have my pediatrician information entered on my profile page',0,2,'','','ETCeP3UfcsBJP9mE7VR4Fq9OL7hAod6P',''),(20,'Entered my child\'s diagnoses on my profile page',0,2,'','','ETCeP3UfcsBJP9mE7VR4Fq9OL7hAod6P',''),(21,'Install car seat in my car',0,2,'','','ETCeP3UfcsBJP9mE7VR4Fq9OL7hAod6P',''),(22,'Passed car seat challenge in the hospital',0,2,'','','ETCeP3UfcsBJP9mE7VR4Fq9OL7hAod6P',''),(23,'Have a copy of my child\'s newborn hearing screen',0,2,'','','',''),(24,'Make appointment with pediatrician',0,2,'','','',''),(25,'Make appointment with all subspecialists',0,2,'','','','');
/*!40000 ALTER TABLE `TodoList` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `User`
--

DROP TABLE IF EXISTS `User`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `User` (
  `user_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `public_id` varchar(32) NOT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `User`
--

LOCK TABLES `User` WRITE;
/*!40000 ALTER TABLE `User` DISABLE KEYS */;
INSERT INTO `User` VALUES (30,'alex@qolty.com','$2a$04$PBMq0JLNi.B2ScqwLUtvyO/S5hqRm1TPuHlLn1Nr8Fuh20XoRg5p6','ETCeP3UfcsBJP9mE7VR4Fq9OL7hAod6P'),(31,'alex1@gmail.com','$2a$04$UPfhgerE6hPsmzAJq0yCHOPpnKI.NpRIXvUswijJIQnTvDdoVjBSy','3aUFedwpi1lu7xqyWKediA8NZgZTyNPC');
/*!40000 ALTER TABLE `User` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `UserPushNotificationToken`
--

DROP TABLE IF EXISTS `UserPushNotificationToken`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `UserPushNotificationToken` (
  `user_push_notification_token_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` varchar(32) DEFAULT NULL,
  `token` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`user_push_notification_token_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `UserPushNotificationToken`
--

LOCK TABLES `UserPushNotificationToken` WRITE;
/*!40000 ALTER TABLE `UserPushNotificationToken` DISABLE KEYS */;
INSERT INTO `UserPushNotificationToken` VALUES (1,'ETCeP3UfcsBJP9mE7VR4Fq9OL7hAod6P','ExponentPushToken[VJs59OBdprwvutvDploJ9U]');
/*!40000 ALTER TABLE `UserPushNotificationToken` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `WellnessCategory`
--

DROP TABLE IF EXISTS `WellnessCategory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `WellnessCategory` (
  `wellness_category_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `image` varchar(255) NOT NULL,
  PRIMARY KEY (`wellness_category_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `WellnessCategory`
--

LOCK TABLES `WellnessCategory` WRITE;
/*!40000 ALTER TABLE `WellnessCategory` DISABLE KEYS */;
INSERT INTO `WellnessCategory` VALUES (1,'Parent Support Group Login','https://s3.us-west-2.amazonaws.com/qolty/images/nicu/wellness/Parent-Support-Group-Login-.png'),(2,'Mood Tracker','https://s3.us-west-2.amazonaws.com/qolty/images/nicu/wellness/Mood-Tracker-.png'),(3,'Emotion Tracker','https://s3.us-west-2.amazonaws.com/qolty/images/nicu/wellness/Emotion-Tracker.png');
/*!40000 ALTER TABLE `WellnessCategory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Diagnosis`
--

DROP TABLE IF EXISTS `Diagnosis`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `Diagnosis` (
  `diagnosis_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` varchar(32) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`diagnosis_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Diagnosis`
--

LOCK TABLES `Diagnosis` WRITE;
/*!40000 ALTER TABLE `Diagnosis` DISABLE KEYS */;
INSERT INTO `Diagnosis` VALUES (1,'ETCeP3UfcsBJP9mE7VR4Fq9OL7hAod6P', 'Meconium Aspiration Syndrome');
/*!40000 ALTER TABLE `Diagnosis` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Medication`
--

DROP TABLE IF EXISTS `Medication`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `Medication` (
  `medication_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` varchar(32) DEFAULT NULL,
  `prescription_name` varchar(255) NOT NULL,
  `dosage` varchar(255) NOT NULL,
  `dosage_instructions` varchar(255) NOT NULL,
  PRIMARY KEY (`medication_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Medication`
--

LOCK TABLES `Medication` WRITE;
/*!40000 ALTER TABLE `Medication` DISABLE KEYS */;
INSERT INTO `Medication` VALUES (1,'ETCeP3UfcsBJP9mE7VR4Fq9OL7hAod6P', 'Aspirin', '1 ~ 2 tablets', 'twice a day');
/*!40000 ALTER TABLE `Medication` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Medication`
--

DROP TABLE IF EXISTS `Doctor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `Doctor` (
  `doctor_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` varchar(32) DEFAULT NULL,
  `type` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `number` varchar(255) NOT NULL,
  PRIMARY KEY (`doctor_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Doctor`
--

LOCK TABLES `Doctor` WRITE;
/*!40000 ALTER TABLE `Doctor` DISABLE KEYS */;
INSERT INTO `Doctor` VALUES (1,'ETCeP3UfcsBJP9mE7VR4Fq9OL7hAod6P', 'Primary Care', 'Peter', '000-000-0000');
/*!40000 ALTER TABLE `Doctor` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-01-25 21:11:20
