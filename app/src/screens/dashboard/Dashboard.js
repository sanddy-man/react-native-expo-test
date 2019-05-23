import React, { Component } from "react";
import { Container, Tabs, TabHeading, Tab } from "native-base";
import { SafeAreaView } from 'react-navigation';
import styles from "./styles";
import { Constants } from "../../config";
import { Modals, TabItems } from "../../components";
import LibraryHome from "../library/LibraryHome";
import ResourcesHome from "../resources/ResourcesHome";
import TodoHome from "../todo/TodoHome";
import WellnessHome from "../wellness/WellnessHome";
import Profile from "../profile/Profile";
import { SecureStore } from 'expo';
import { AsyncStorage } from "react-native";
import { NavigationActions } from 'react-navigation';
import { getlang } from "../../config/constants";
import multilingual from "../../config/multilingual";


class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      favoriteOnly:false,
      activeLibraryTabItem: "All",
      activeResourcesTabItem: Constants.RESOURCES_TAB_LABELS[0],
      activeWellnessTabItem: "Mood Journal",
      houseListSearchText: "",
      profileFormBusy: false,
      profileName: Constants.PROFILE_NAME,
      profileMobileNumber: Constants.PROFILE_MOBILE_NUMBER,
      profileContactShare: false,
      profileLocationEnabled: false,
      notificationsEnabled: false,
      filterCategories: Constants.FILTER_CATEGORIES,
      activeFilterCategories: [],
      filterMinPrice: 500,
      filterMaxPrice: 11000,
      filterStartPrice: 3500,
      filterStopPrice: 7500,
      filterFormBusy: false,
      enableLocationModalVisible: false,
      enableContactShareModalVisible: false,
      rentalsListings: Constants.RENTAL_LISTINGS,
      content: [],
      checkList: [],
      todoList: [],
      showTaskValue: '0',
      moodLog: [],
      libraryCategories: [],
      resourceCategories: [],
      wellnessCategories: [],
      medications: [],
      diagnosis: [],
      doctors: []
    };
  }

  componentDidMount() {
    SecureStore.getItemAsync("jwt").then((value) => {
      if (value != null){
        fetch(Constants.API_ROOT + "/content", {
          method: "GET",
          headers: {
            "Authorization": "Bearer " + value
          },
        }).then((response) => response.json()
        .then((responseJson) => {
          if (response.status === 401){
            this.props.navigation.reset([NavigationActions.navigate({ routeName: '_home' })], 0);
            return;
          };

          if (responseJson.content != null){
            getlang().then(lang => {
              // get all initial data here. profile data, notification settings, favorites
              this.setState({
                profile: responseJson.profile,
                content: responseJson.content,
                checkList: responseJson.checkList,
                todoList: responseJson.todoList,
                moodLog: responseJson.moodLog,
                diagnosis: responseJson.diagnosis,
                medications: responseJson.medications,
                doctors: responseJson.doctors,
                libraryCategories: [{"categories":responseJson.categories["LibraryCategory"]}],
                resourceCategories: [{"categories":responseJson.categories["ResourceCategory"]}],
                wellnessCategories: [{"categories":responseJson.categories["WellnessCategory"]}],
                lang,
              });
            })
            // AsyncStorage.setItem('content', JSON.stringify(responseJson.content));
            // console.log( responseJson.medications);
          } else {
            this.props.navigation.reset([NavigationActions.navigate({ routeName: '_home' })], 0);
          }
        }))
        .catch((error) => {
          this.props.navigation.reset([NavigationActions.navigate({ routeName: '_home' })], 0);
        });
      } else {
        this.props.navigation.reset([NavigationActions.navigate({ routeName: '_home' })], 0);
      }
    }).done();
  }

  onLibraryTabItemPress(tab) {
    var favoriteOnly = true;

    if (tab == "All"){
      favoriteOnly = false;
    }

    this.setState({
      activeLibraryTabItem: tab,
      favoriteOnly: favoriteOnly,
    });
  }

  onResourcesTabItemPress(index) {
    this.setState({
      activeResourcesTabItem: Constants.RESOURCES_TAB_LABELS[index]
    });
  }

  onWellnessTabItemPress(tab) {
    this.setState({
      activeWellnessTabItem: tab,
    });
  }

  onLogout(){
    SecureStore.deleteItemAsync("jwt");
    AsyncStorage.clear();
    this.props.navigation.reset([NavigationActions.navigate({ routeName: '_login' })], 0);
  }

  onFilterItemPress(categoryIndex, itemIndex) {
    let item = this.state.filterCategories[categoryIndex].filters[itemIndex];
    if (this.state.activeFilterCategories.includes(item)) {
      const before = this.state.activeFilterCategories.slice(
        0,
        this.state.activeFilterCategories.indexOf(item)
      );
      const after = this.state.activeFilterCategories.slice(
        this.state.activeFilterCategories.indexOf(item) + 1
      );
      this.setState({
        activeFilterCategories: [...before, ...after]
      });
    } else {
      this.setState({
        activeFilterCategories: [...this.state.activeFilterCategories, item]
      });
    }
  }

  onFilterPriceRangeChange(values) {
    this.setState({
      filterStartPrice: values[0],
      filterStopPrice: values[1]
    });
  }

  onFilterSubmitPress() {
    this.setState({ filterFormBusy: true });
    setTimeout(() => {
      this.setState({ filterFormBusy: false });
      this.props.navigation.navigate("_filterResult");
    }, 3000);
  }

  updateProfileNameField(name) {
    this.setState({ profileName: name });
  }

  updateProfileMobileNumberField(mobileNumber) {
    this.setState({ profileMobileNumber: mobileNumber });
  }

  updateProfileContactSharing(value) {
    if (value) {
      this.setState({ enableContactShareModalVisible: value });
    } else {
      this.setState({ profileContactShare: value });
    }
  }

  updateProfileLocationToggle(value) {
    if (value) {
      this.setState({ enableLocationModalVisible: value });
    } else {
      this.setState({ profileLocationEnabled: value });
    }
  }

  allowNotifications() {
    this.setState({ notificationsEnabled: true });
  }

  enableLocationServices() {
    this.setState({
      profileLocationEnabled: true,
      enableLocationModalVisible: false
    });
  }

  enableContactSharing() {
    this.setState({
      profileContactShare: true,
      enableContactShareModalVisible: false
    });
  }

  onCheckTask(taskId) {
    var todoList = this.state.todoList.slice();
    const index = this.state.todoList.findIndex(el => el.todo_list_id == taskId);
    const item = todoList[index];
    if (item) {
      const request = item.checked == '0'
        ? { ...item, checked: '1' }
        : { ...item, checked: '0' }
      SecureStore.getItemAsync("jwt").then((value) => {
        if (value != null){
          fetch(Constants.API_ROOT + "/updateTodoList", {
            method: 'POST',
            headers: {
              "Authorization": "Bearer " + value,
            },
            body: JSON.stringify({
              ...request,
              todo_list_id: parseInt(request.todo_list_id),
              checked: parseInt(request.checked),
              check_list_id: parseInt(request.check_list_id),
            }),
          }).then(() => {
            todoList[index] = request
            this.setState({
              todoList: todoList
            });
          }).catch(err => {
            alert('Error occured!', err)
          });
        }
      }).done();
    }
  }

  onUpdateTask(item) {
    var todoList = this.state.todoList.slice();
    const index = this.state.todoList.findIndex(el => el.todo_list_id == item.todo_list_id);
    const request = {...item}
    SecureStore.getItemAsync("jwt").then((value) => {
      if (value != null){
        fetch(Constants.API_ROOT + "/updateTodoList", {
          method: 'POST',
          headers: {
            "Authorization": "Bearer " + value,
          },
          body: JSON.stringify({
            ...request,
            todo_list_id: parseInt(request.todo_list_id),
            checked: parseInt(request.checked),
            check_list_id: parseInt(request.check_list_id),
          }),
        }).then(() => {
          todoList[index] = request
          this.setState({
            todoList: todoList
          });
        }).catch(err => {
          alert('Error occured!', err)
        });
      }
    }).done();
  }

  onDeleteTask(taskId) {
    SecureStore.getItemAsync("jwt").then((value) => {
      if (value != null){
        fetch(Constants.API_ROOT + "/delTodoList", {
          method: 'POST',
          headers: {
            "Authorization": "Bearer " + value,
          },
          body: JSON.stringify({
            todo_list_id: parseInt(taskId)
          }),
        }).then(() => {
          const todoList = this.state.todoList.slice().filter(list => list.todo_list_id !== taskId);
          this.setState({ todoList });
        }).catch(err => {
          alert('Error occured!', err)
        });
      }
    }).done();
  }

  onAddTask(data) {
    SecureStore.getItemAsync("jwt").then((value) => {
      if (value != null){
        fetch(Constants.API_ROOT + "/createTodoList", {
          method: 'POST',
          headers: {
            "Authorization": "Bearer " + value,
          },
          body: JSON.stringify({
            name: data.name,
            checked: parseInt(data.checked),
            check_list_id: parseInt(data.check_list_id),
            url: data.url,
            notes: data.notes,
            alert: data.alert,
          }),
        }).then((res) => {
          const data = JSON.parse(res._bodyText).logData;
          this.setState({
            todoList: [...this.state.todoList, {
              ...data,
              todo_list_id: data.todo_list_id + '',
              checked: data.checked + '',
              check_list_id: data.check_list_id + '',
            }]
          });
        }).catch(err => {
          alert('Error occured!', err)
        });
      }
    }).done();
  }

  onCreateCheckList(data) {
    SecureStore.getItemAsync("jwt").then((value) => {
      if (value != null){
        fetch(Constants.API_ROOT + "/createCheckList", {
          method: 'POST',
          headers: {
            "Authorization": "Bearer " + value,
          },
          body: JSON.stringify(data),
        }).then((res) => {
          const data = JSON.parse(res._bodyText).logData;
          this.setState({
            checkList: [...this.state.checkList, {...data, check_list_id: data.check_list_id + ''}]
          });
        }).catch(err => {
          alert('Error occured!', err)
        });
      }
    }).done();
  }

  onChangeSearchText(text) {
    this.setState({
      houseListSearchText: text
    });
  }

  onTabChange(index) {
    this.setState({
      currentPage: index + 1,
      houseListSearchText: ""
    });
  }

  onHouseListItemPress() {
    this.setState({
      houseListSearchText: ""
    });
    this.props.navigation.navigate("_houseDetail");
  }

  openSettings() {
    this.props.navigation.navigate("_settings", {
      onLogout:this.onLogout.bind(this),
      profile: this.state.profile
    });
  }

  // TODO: Send add/remove request to database.
  updateFavorite(content_id) {
    var content = this.state.content.slice();

    for (var i = 0; i < content.length; i++){
      if (content[i].content_id == content_id){
        var addOrRemove = "/addFavorite";

        if (content[i].favorite_content_id != "NULL"){
          addOrRemove = "/removeFavorite";

          content[i] = {
            ...this.state.content[i],
            favorite_content_id:"NULL",
          }
        } else {
          content[i] = {
            ...this.state.content[i],
            favorite_content_id:"1",
          }
        }

        SecureStore.getItemAsync("jwt").then((value) => {
          if (value != null){
            fetch(Constants.API_ROOT + addOrRemove, {
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + value,
              },
              body: JSON.stringify({
                content_id: parseInt(content_id),
              }),
            });
          }
        }).done();

        break;
      }
    }

    this.setState({
      content: content
    });
  }

  onSearch(text, autofocus) {
    if (autofocus != true){
      autofocus = false
    }

    this.props.navigation.navigate("_librarySearch", {searchText:text,autofocus:autofocus,content:this.state.content,updateFavorite:this.updateFavorite.bind(this)});
  }

  updateMoodLog(moodLogItem) {
    this.setState(prevState => ({
      moodLog: [moodLogItem, ...prevState.moodLog]
    }));
  }

  editMoodLog(moodItem) {
    const moodLog = [...this.state.moodLog]
    const index = moodLog.findIndex(val => val.mood_log_id + '' === moodItem.mood_log_id + '')
    moodLog[index] = moodItem
    this.setState({ moodLog })
  }

  onLogMood() {
    this.props.navigation.navigate("_logMoodOne", {
      updateMoodLog:this.updateMoodLog.bind(this),
      editMoodLog: this.editMoodLog.bind(this),
    });
  }

  addMedication(medicationData) {
    this.setState(prevState => ({
      medications: [...prevState.medications, medicationData]
    }));
    SecureStore.getItemAsync("jwt").then((value) => {
      if (value != null){
        fetch(Constants.API_ROOT + '/addMedication', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            "Authorization": "Bearer " + value,
          },
          body: JSON.stringify({
            medicationId: ' ',
            prescriptionName: medicationData.prescription_name,
            dosage: medicationData.dosage,
            dosageInstructions: medicationData.dosage_instructions,
          }),
        });
      }
    }).done();
  }

  onAddMedication() {
    this.props.navigation.navigate("_addMedication", {addMedication:this.addMedication.bind(this)});
  }

  delMedication(item) {
    const newData = this.state.medications.filter(val => val !== item)
    this.setState({
      medications: newData
    });
    SecureStore.getItemAsync("jwt").then((value) => {
      if (value != null){
        fetch(Constants.API_ROOT + '/delMedication', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            "Authorization": "Bearer " + value,
          },
          body: JSON.stringify({
            medicationId: item.medication_id,
            prescriptionName: item.prescription_name,
            dosage: item.dosage,
            dosageInstructions: item.dosage_instructions,
          }),
        });
      }
    }).done();
  }

  editMedication(medicationData, index) {
    const data = [...this.state.medications]
    data[index] = medicationData
    this.setState({
      medications: data
    })
    SecureStore.getItemAsync("jwt").then((value) => {
      if (value != null){
        fetch(Constants.API_ROOT + '/editMedication', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            "Authorization": "Bearer " + value,
          },
          body: JSON.stringify({
            medicationId: medicationData.medication_id,
            prescriptionName: medicationData.prescription_name,
            dosage: medicationData.dosage,
            dosageInstructions: medicationData.dosage_instructions,
          }),
        });
      }
    }).done();
  }

  onEditMedication(item) {
    const index = this.state.medications.indexOf(item);
    this.props.navigation.navigate("_addMedication", {
      editMedication:this.editMedication.bind(this),
      delMedication:this.delMedication.bind(this),
      item,
      index
    });
  }

  addDiagnosis(diagnosisData) {
    this.setState(prevState => ({
      diagnosis: [...prevState.diagnosis, diagnosisData]
    }));
    SecureStore.getItemAsync("jwt").then((value) => {
      if (value != null){
        fetch(Constants.API_ROOT + '/addDiagnosis', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            "Authorization": "Bearer " + value,
          },
          body: JSON.stringify({
            diagnosisId: ' ',
            diagnosis: diagnosisData.name,
          }),
        });
      }
    }).done();
  }

  editDiagnosis(diagnosisData, index) {
    const data = [...this.state.diagnosis];
    data[index] = diagnosisData;
    this.setState({
      diagnosis: data
    });
    SecureStore.getItemAsync("jwt").then((value) => {
      if (value != null){
        fetch(Constants.API_ROOT + '/editDiagnosis', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            "Authorization": "Bearer " + value,
          },
          body: JSON.stringify({
            diagnosisId: diagnosisData.diagnosis_id,
            diagnosis: diagnosisData.name,
          }),
        });
      }
    }).done();
  }

  delDiagnosis(item) {
    const newData = this.state.diagnosis.filter(val => val !== item)
    this.setState({
      diagnosis: newData
    });
    SecureStore.getItemAsync("jwt").then((value) => {
      if (value != null){
        fetch(Constants.API_ROOT + '/delDiagnosis', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            "Authorization": "Bearer " + value,
          },
          body: JSON.stringify({
            diagnosisId: item.diagnosis_id,
            diagnosis: item.name
          }),
        });
      }
    }).done();
  }

  onAddDiagnosis() {
    this.props.navigation.navigate("_addDiagnosis", {addDiagnosis:this.addDiagnosis.bind(this)});
  }

  onEditDiagnosis(item) {
    const index = this.state.diagnosis.indexOf(item);
    this.props.navigation.navigate("_addDiagnosis", {
      editDiagnosis:this.editDiagnosis.bind(this),
      delDiagnosis:this.delDiagnosis.bind(this),
      item,
      index
    });
  }

  addDoctor(doctorData) {
    this.setState(prevState => ({
      doctors: [...prevState.doctors, doctorData]
    }));
    SecureStore.getItemAsync("jwt").then((value) => {
      if (value != null){
        fetch(Constants.API_ROOT + '/addDoctor', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            "Authorization": "Bearer " + value,
          },
          body: JSON.stringify({
            doctorId: ' ',
            doctorType: doctorData.type,
            doctorName: doctorData.name,
            doctorNumber: doctorData.number,
          }),
        });
      }
    }).done();
  }

  editDoctor(doctorData, index) {
    const data = [...this.state.doctors]
    data[index] = doctorData
    this.setState({
      doctors: data
    });
    SecureStore.getItemAsync("jwt").then((value) => {
      if (value != null){
        fetch(Constants.API_ROOT + '/editDoctor', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            "Authorization": "Bearer " + value,
          },
          body: JSON.stringify({
            doctorId: doctorData.doctor_id,
            doctorType: doctorData.type,
            doctorName: doctorData.name,
            doctorNumber: doctorData.number
          }),
        });
      }
    }).done();
  }

  onAddDoctor() {
    this.props.navigation.navigate("_addDoctor", {addDoctor:this.addDoctor.bind(this)});
  }

  onEditDoctor(item) {
    const index = this.state.doctors.indexOf(item)
    this.props.navigation.navigate("_addDoctor", {
      editDoctor: this.editDoctor.bind(this),
      delDoctor: this.delDoctor.bind(this),
      item,
      index,
    })
  }

  delDoctor(item) {
    const newData = this.state.doctors.filter(val => val !== item)
    this.setState({
      doctors: newData
    });
    SecureStore.getItemAsync("jwt").then((value) => {
      if (value != null){
        fetch(Constants.API_ROOT + '/delDoctor', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            "Authorization": "Bearer " + value,
          },
          body: JSON.stringify({
            doctorId: item.doctor_id,
            doctorType: item.type,
            doctorName: item.name,
            doctorNumber: item.number
          }),
        });
      }
    }).done();
  }

  save() {
    this.setState({ profileFormBusy: true });
    setTimeout(() => {
      this.setState({ profileFormBusy: false });
    }, 5000);
  }

  render() {
    const {lang} = this.state
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: '#F7F7F7'}} forceInset={{ top: 'never' }}>
        <Container style={{ backgroundColor: "#FFF" }}>
          <Tabs
            page={this.state.currentPage - 1}
            locked={true}
            tabBarPosition="bottom"
            tabBarUnderlineStyle={styles.tabBarUnderline}
            onChangeTab={({ i }) => this.onTabChange(i)}
          >
            <Tab
              heading={
                <TabHeading style={styles.tabHeading}>
                  <TabItems.BottomMenuItem
                    active={this.state.currentPage === 1}
                    icon="book"
                    source={this.state.currentPage === 1
                      ? require('../../assets/images/active-library.png')
                      : require('../../assets/images/inactive-library.png')}
                    text={multilingual.LIBRARY[lang]}
                  />
                </TabHeading>
              }
            >
              <LibraryHome
                onSearch={text => this.onSearch(text, true)}
                tabLabels={[
                  multilingual.ALL[lang],
                  multilingual.FAVORITES[lang]
                ]}
                activeTabItem={this.state.activeLibraryTabItem}
                onTabItemPress={tab => this.onLibraryTabItemPress(tab)}
                categories={this.state.libraryCategories}
                favoriteOnly={this.state.favoriteOnly}
                content={this.state.content}
                onItemPress={text => this.onSearch(text)}
                searchText={this.state.houseListSearchText}
                updateFavorite={content_id => this.updateFavorite(content_id)}
                onChangeSearchText={text => this.onChangeSearchText(text)}
                lang={lang}
              />
            </Tab>

            <Tab
              heading={
                <TabHeading style={styles.tabHeading}>
                  <TabItems.BottomMenuItem
                    active={this.state.currentPage === 2}
                    icon="life-buoy"
                    source={this.state.currentPage === 2
                      ? require('../../assets/images/active-resources.png')
                      : require('../../assets/images/inactive-resources.png')}
                    text={multilingual.RESOURCES[lang]}
                  />
                </TabHeading>
              }
            >
              <ResourcesHome
                onSearch={text => this.onSearch(text, true)}
                tabLabels={[
                  multilingual.ALL[lang],
                  multilingual.FAVORITES[lang]
                ]}
                activeTabItem={this.state.activeResourcesTabItem}
                onTabItemPress={index => this.onResourcesTabItemPress(index)}
                categories={this.state.resourceCategories}
                onItemPress={text => this.onSearch(text)}
                searchText={this.state.houseListSearchText}
                onChangeSearchText={text => this.onChangeSearchText(text)}
                lang={lang}
              />
            </Tab>

            <Tab
              heading={
                <TabHeading style={styles.tabHeading}>
                  <TabItems.BottomMenuItem
                    active={this.state.currentPage === 3}
                    icon="list"
                    source={this.state.currentPage === 3
                      ? require('../../assets/images/active-todo.png')
                      : require('../../assets/images/inactive-todo.png')}
                    text={multilingual.TO_DO[lang]}
                  />
                </TabHeading>
              }
            >

              <TodoHome
                onItemPress={() => this.onHouseListItemPress()}
                searchText={this.state.houseListSearchText}
                onChangeSearchText={text => this.onChangeSearchText(text)}
                onCheckTask={taskId => this.onCheckTask(taskId)}
                onDeleteTask={taskId => this.onDeleteTask(taskId)}
                onAddTask={taskDetail => this.onAddTask(taskDetail)}
                onUpdateTask={taskDetail => this.onUpdateTask(taskDetail)}
                content={this.state.todoList.reduce((accu, value) => {
                  const list = this.state.checkList.find(el => el.check_list_id === value.check_list_id);
                  const title = list ? list.name : '';
                  const index = accu.findIndex(el => el.title === title);
                  // don't show checked item in todo list
                  if (value.checked === this.state.showTaskValue) {
                    if (index === -1) {
                      accu.push({title, data: [value]});
                    } else {
                      accu[index].data.push(value);
                    }
                  }
                  return accu;
                }, [])}
                todoList={this.state.todoList}
                checkList={this.state.checkList}
                onCreateCheckList={(data) => this.onCreateCheckList(data)}
                toggleView={() => {
                  if (this.state.showTaskValue === '0') {
                    this.setState({ showTaskValue: '1' })
                  } else {
                    this.setState({ showTaskValue: '0' })
                  }
                }}
                viewMode={this.state.showTaskValue}
                lang={lang}
              />
            </Tab>

            <Tab
              heading={
                <TabHeading style={styles.tabHeading}>
                  <TabItems.BottomMenuItem
                    active={this.state.currentPage === 4}
                    icon="heart"
                    source={this.state.currentPage === 4
                      ? require('../../assets/images/active-wellness.png')
                      : require('../../assets/images/inactive-wellness.png')}
                    text={multilingual.WELLNESS[lang]}
                  />
                </TabHeading>
              }
            >
              <WellnessHome
                tabLabels={[
                  multilingual.MOOD_JOURNAL[lang],
                  multilingual.SUPPORT[lang]
                ]}
                activeTabItem={this.state.activeWellnessTabItem}
                onTabItemPress={index => this.onWellnessTabItemPress(index)}
                categories={this.state.wellnessCategories}
                content={this.state.content}
                moodLog={this.state.moodLog}
                onLogMood={text => this.onLogMood()}
                onItemPress={text => this.onSearch(text)}
                searchText={this.state.houseListSearchText}
                onChangeSearchText={text => this.onChangeSearchText(text)}
                navigation={this.props.navigation}
                editMoodLog={item => this.editMoodLog(item)}
                lang={lang}
              />
            </Tab>

            <Tab
              heading={
                <TabHeading style={styles.tabHeading}>
                  <TabItems.BottomMenuItem
                    active={this.state.currentPage === 5}
                    icon="user"
                    source = {this.state.currentPage === 5
                      ? require('../../assets/images/active-profile.png')
                      : require('../../assets/images/inactive-profile.png')}
                    text={multilingual.PROFILE[lang]}
                  />
                </TabHeading>
              }
            >
              <Profile
                profileData={this.state.profile}
                formBusy={this.state.profileFormBusy}
                name={this.state.profileName}
                openSettings={() => this.openSettings()}
                onNameChangeText={text => this.updateProfileNameField(text)}
                mobileNumber={this.state.profileMobileNumber}
                onMobileNumberChange={text =>
                  this.updateProfileMobileNumberField(text)
                }
                contactShare={this.state.profileContactShare}
                onContactShareChange={value =>
                  this.updateProfileContactSharing(value)
                }
                locationEnabled={this.state.profileLocationEnabled}
                onLocationEnabledChange={value =>
                  this.updateProfileLocationToggle(value)
                }
                onFormSubmitPress={() => this.save()}
                onLogoutPress={() => this.onLogout()}
                onAddMedication={() => this.onAddMedication()}
                delMedication={(item) => this.delMedication(item)}
                onEditMedication={(item) => this.onEditMedication(item)}
                medications={this.state.medications}
                onAddDiagnosis={() => this.onAddDiagnosis()}
                delDiagnosis={(item) => this.delDiagnosis(item)}
                diagnosis={this.state.diagnosis}
                onEditDiagnosis={(item) => this.onEditDiagnosis(item)}
                onAddDoctor={() => this.onAddDoctor()}
                doctors={this.state.doctors}
                delDoctor={(item) => this.delDoctor(item)}
                onEditDoctor={(item) => this.onEditDoctor(item)}
                lang={lang}
              />
            </Tab>
          </Tabs>

          {this.state.enableLocationModalVisible === true && (
            <Modals.LocationPermissionModal
              onCloseIconPress={() =>
                this.setState({ enableLocationModalVisible: false })
              }
              onAllowPress={() => this.enableLocationServices()}
            />
          )}

          {this.state.enableContactShareModalVisible === true && (
            <Modals.ContactPermissionModal
              onCloseIconPress={() =>
                this.setState({ enableContactShareModalVisible: false })
              }
              onAllowPress={() => this.enableContactSharing()}
            />
          )}
        </Container>
      </SafeAreaView>
    );
  }
}

export default Dashboard;
