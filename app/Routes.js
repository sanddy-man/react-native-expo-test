import React from "react";
import { createStackNavigator } from "react-navigation";
import * as Screens from "./src/screens";

const RootStack = createStackNavigator(
  {
    _splash: Screens.Splash,
    _home: Screens.Home,
    _login: Screens.Login,
    _register: Screens.Register,
    _register1: Screens.Register1,
    _register2: Screens.Register2,
    _register3: Screens.Register3,
    _register4: Screens.Register4,
    _dashboard: Screens.Dashboard,
    _education: Screens.Education,
    _houseDetail: Screens.HouseDetail,
    _filterResult: Screens.FilterResult,
    _librarySearch: Screens.LibrarySearch,
    _settings: Screens.Settings,
    _logMoodOne: Screens.LogMoodOne,
    _logMoodTwo: Screens.LogMoodTwo,
    _logMoodResult: Screens.LogMoodResult,
    _addMedication: Screens.AddMedication,
    _addDiagnosis: Screens.AddDiagnosis,
    _addDoctor: Screens.AddDoctor,
    _changePassword: Screens.ChangePassword,
  },
  {
    initialRouteName: "_splash",
    navigationOptions: {
      gesturesEnabled: false,
      header: null
    }
  }
);

export default function Routes(props) {
  return <RootStack />;
}
