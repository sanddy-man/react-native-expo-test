import { SecureStore } from "expo";

/** General */
//========
// export const API_ROOT = "https://api.qolty.com/nicu/v1";
// export const API_ROOT = "http://10.150.28.105/nicu/v1";
// export const API_ROOT = "http://192.168.0.104/nicu/v1";
// export const API_ROOT = "http://127.0.0.1/nicu/v1";
export const API_ROOT = "http://192.168.1.103/nicu/v1";
export const APP_NAME = "Qolty";
export const WELCOME_TO = "WELCOME TO";
export const INTRO_TEXT_1 =
  "Navigate your baby's";
export const INTRO_TEXT_2 =
  "health, one step at a time.";
export const GET_STARTED = "Get Started";
export const WELCOME = "WELCOME";
export const SIGN_IN_TEXT = "Sign in to your NICU account.";
export const CREATE_AN_ACCOUNT = "Tap here to create an account";
export const HI_THERE = "HI THERE";
export const REGISTER_TEXT = "Create a NICU account.";
export const TYPE_LOCATION = "Type location";
export const NOTIFICATIONS = "Notifications";
export const NOTIFICATIONS_PERMISSION_TEXT =
  "Get reminders and other notifications";
export const NOTIFICATIONS_PERMISSION_ALLOW_TEXT = "Enable Push Notifications";
export const DO_NOT_ALLOW = "Do not allow";
export const CONTACT_PERSON_TEXT = "The contact person for this apartment is: ";
export const CALL = "Call";
export const CONTACT_OWNER = "Contact Owner";
export const FILTER = "Filter";
export const FILTER_CATEGORIES = [
  {
    title: "Tenant Type",
    filters: ["Family", "Couple", "Single", "Roommates", "Group"]
  },
  {
    title: "Apartment Type",
    filters: ["1BHK", "2BHK", "Dormitory", "Shared", "Room & Bath"]
  },
  {
    title: "Facilities",
    filters: [
      "Elevator",
      "2 Baths",
      "1 Kitchen",
      "2 Rooms",
      "24/7 Water",
      "Constant Power",
      "Parking"
    ]
  }
];
export const ENABLE_LOCATION_SERVICES = "Enable location services";
export const LOCATION_SERVICES_PERMISSION_TEXT = "";
export const LOCATION_SERVICES_PERMISSION_ALLOW_TEXT = "Enable";

export const SHARE_CONTACT_DETAILS = "Share contact details";
export const CONTACT_PERMISSION_TEXT =
  "Grant House Rental access to your contacts";
export const CONTACT_PERMISSION_ALLOW_TEXT = "Share";

export const RENTAL_LISTINGS = [
  {
    heading: "Jump to a Topic",
    rentalItems: [
      {
        key: "1",
        image: "https://s3-us-west-2.amazonaws.com/hexcare/images/U2ncBsF0Zl0FgysmahlspkBrPpqDG19l.png",
        title: "CHLA",
        price: "G-Tube",
        link: "https://www.youtube.com/watch?v=xAL_TrQdtTY"
      },
      {
        key: "2",
        image: "https://s3-us-west-2.amazonaws.com/hexcare/images/ggwIoq1mulyu4NjzBEpE7v7i8U0k8Rgi1465083764.png",
        title: "NIH",
        price: "Feeding",
        link: "http://www.healthline.com/health/total-knee-replacement-surgery/common-questions"
      },
      {
        key: "3",
        image: "https://s3-us-west-2.amazonaws.com/hexcare/images/0GvQVBOl8u1HAeSk9lyszGfOVBMTqyqj1468253499.png",
        title: "USC",
        price: "A Knee Up",
        link: "https://www.dropbox.com/s/bv0engjrfpxu0tu/A%20Knee%20UP.mov?oref=e&n=311213069"
      }
    ]
  }
  // {
  //   heading: "Total Hip Replacement",
  //   rentalItems: [
  //     {
  //       key: "1",
  //       image: "https://s3-us-west-2.amazonaws.com/hexcare/images/293zY3bnj7B0AOJuKq7CMImPpCzQ4MG51482200622.png",
  //       title: "AAOS",
  //       price: "Activities After Hip Replacement",
  //       link: "http://orthoinfo.aaos.org/topic.cfm?topic=a00356"
  //     },
  //     {
  //       key: "2",
  //       image: "https://s3-us-west-2.amazonaws.com/hexcare/images/EfuDxOWPsJz6i7yegFn7XuMWVxwDLopi1482200968.png",
  //       title: "Mayo Clinic",
  //       price: "What you can expect",
  //       link: "http://www.mayoclinic.org/tests-procedures/hip-replacement-surgery/basics/what-you-can-expect/prc-20019151"
  //     },
  //     {
  //       key: "3",
  //       image: "https://s3-us-west-2.amazonaws.com/hexcare/images/RflmsZM7tbHJUGa8AnFvyIvhP3P2ckSM1482200817.png",
  //       title: "HipandKneeTV",
  //       price: "The first 6 weeks",
  //       link: "https://www.youtube.com/watch?v=fMsLT2Sowos"
  //     }
  //   ]
  // },
  // {
  //   heading: "Diabetes Management",
  //   rentalItems: [
  //     {
  //       key: "1",
  //       image: "https://s3-us-west-2.amazonaws.com/hexcare/images/g7WeQBXW9Wsdh1nKnCOyvo7uHJN9YbYt1489173753.jpg",
  //       title: "WebMD",
  //       price: "Diet Tips",
  //       link: "https://www.youtube.com/watch?v=0xgeG2gtI0A"
  //     }
  //   ]
  // }
];

export const FILTER_RESULT = [
  {
    key: "1",
    image: require("../assets/images/rentals/rental2.jpeg"),
    title: "1BHK Residential apartment for sale",
    price: "1,500"
  },
  {
    key: "2",
    image: require("../assets/images/rentals/rental3.jpeg"),
    title: "1BHK Residential apartment for rent",
    price: "3,500"
  },
  {
    key: "3",
    image: require("../assets/images/rentals/rental1.jpeg"),
    title: "1BHK shared apartment for rent",
    price: "5,000"
  },
  {
    key: "4",
    image: require("../assets/images/rentals/rental5.jpeg"),
    title: "1BHK Residential apartment for sale",
    price: "11,500"
  },
  {
    key: "5",
    image: require("../assets/images/rentals/rental2.jpeg"),
    title: "1BHK Residential apartment for sale",
    price: "1,500"
  },
  {
    key: "6",
    image: require("../assets/images/rentals/rental3.jpeg"),
    title: "1BHK Residential apartment for rent",
    price: "3,500"
  },
  {
    key: "7",
    image: require("../assets/images/rentals/rental1.jpeg"),
    title: "1BHK shared apartment for rent",
    price: "5,000"
  },
  {
    key: "8",
    image: require("../assets/images/rentals/rental5.jpeg"),
    title: "1BHK Residential apartment for sale",
    price: "11,500"
  }
];

export const HOUSE_DETAILS = [
  {
    icon: "layout",
    title: "Layout",
    subtitle: "2 Bedrooms, 2 Bathrooms, 1 Hall, 1 Kitchen"
  },
  {
    icon: "info",
    title: "Rent Details",
    subtitle: "13, 500 (negotiable) - Maintenance (1,500/month)"
  },
  {
    icon: "users",
    title: "Tenant Type",
    subtitle: "Family / Bachelor"
  },
  {
    icon: "maximize-2",
    title: "Size",
    subtitle: "Total area of 1000 Sq. Ft"
  },
  {
    icon: "map",
    title: "Address",
    subtitle: "3995 Capitol Avenue, Mount Meridian, Indiana"
  }
];
//========

/** Forms */
//========
export const NAME = "Name";
export const BIRTH_DATE = "Birth Date";
export const FULL_NAME = "Full Name";
export const BABY_NAME = "Baby's Name";
export const BABY_DOB = "Baby's Date of Birth";
export const EMAIL = "Email";
export const MOBILE_NUMBER = "Mobile number";
export const PASSWORD = "Password";
export const LOGIN = "Login";
export const REGISTER = "Register";
export const SAVE = "Save";
export const DONE = "Done";
export const PRICE_RANGE = "Price Range";
export const PROFILE_NAME = "Alex Wormuth";
export const PROFILE_MOBILE_NUMBER = "alex@chla.org";
export const ENABLE_LOCATION = "Enable location";
//========

/** Tabs */
//========
export const LIBRARY_TAB_LABELS = [
  "All",
  "Favorites"
];
export const RESOURCES_TAB_LABELS = [
  "All",
  "Favorites"
];
export const WELLNESS_TAB_LABELS = [
  "Mood Journal",
  "Support"
];
export const BOTTOM_MENU_ITEMS = [
  { icon: "home", route: "_houseList" },
  { icon: "sliders", route: "_education" },
  { icon: "bell", route: "_notifications" },
  { icon: "user", route: "_profile" }
];
//========

export const STUDY_TASKS = [
  {
    title: "Understanding Equipment in the NICU",
    description:
      "Equipment",
    image: "https://cdn2.iconfinder.com/data/icons/digital-and-internet-marketing-3-1/50/111-512.png"
  },
  {
    title: "Understanding newborn screening tests for your baby",
    description:
      "Routine Care",
    image: "https://cdn2.iconfinder.com/data/icons/digital-and-internet-marketing-3-1/50/111-512.png"
  },
  {
    title: "Care Mapping",
    description:
      "Care Mapping",
    image: "https://cdn2.iconfinder.com/data/icons/digital-and-internet-marketing-3-1/50/111-512.png"
  }
  // {
  //   title: "Log Medication",
  //   description:
  //     "Pets are no longer allowed in residential apartments at your location.",
  //   image: require("../assets/images/avatar.png")
  // },
  // {
  //   title: "Log Pain",
  //   description:
  //     "Pets are no longer allowed in residential apartments at your location.",
  //   image: require("../assets/images/avatar.png")
  // }
];

/** Dummy data */
//========
export const SAMPLE_NOTIFICATIONS = [
  {
    title: "Survey reminder",
    description:
      "Today, 8:30pm: Please remember to fill out 'PROMIS QoL Survey'!",
    image: "https://cdn2.iconfinder.com/data/icons/digital-and-internet-marketing-3-1/50/111-512.png"
  },
  {
    title: "Message",
    description:
      "Today, 8pm: Great job taking your medications and surveys lately! 😁",
    image: "http://www.iconarchive.com/download/i75883/martz90/circle/messages.ico"
  },
  {
    title: "Medication reminder",
    description: "Yesterday, 8pm: Remember to take your Hydroxyurea daily at 8pm.",
    image: "https://cdn1.iconfinder.com/data/icons/line-filled-icons-part-2/64/_Add_Medication-512.png"
  },
  {
    title: "Medication reminder",
    description:
      "10/06/2018: 8pm, Remember to take your Hydroxyurea daily at 8pm.",
    image: "https://cdn1.iconfinder.com/data/icons/line-filled-icons-part-2/64/_Add_Medication-512.png"
  },
  {
    title: "Survey reminder",
    description:
      "10/04/2018: 8pm, Please remember to fill out 'PROMIS Social Anxiety'!",
    image: "https://cdn2.iconfinder.com/data/icons/digital-and-internet-marketing-3-1/50/111-512.png"
  }
];
//========
export const validateEmail = (email) => {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

export const validatePassword = (password) => {
  var strongRegex = new RegExp("^(?=.*[A-Z])(?=.*[0-9])(?=.{8,})");
  return strongRegex.test(password);
}

export const swipeConfig = {
  velocityThreshold: 0.3,
  directionalOffsetThreshold: 80
};

export const getlang = () => {
  return SecureStore.getItemAsync("language").then((language) => {
    return language || 'en'
  });
}

export const setlang = (val) => {
  return SecureStore.setItemAsync("language", val)
}

