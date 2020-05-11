let date = new Date();
let year = date.getFullYear();

const APPCONFIG = {
  brand: "TEST",
  year: year,
  AutoCloseMobileNav: true, // Boolean: true, false. Automatically close sidenav on route change (Mobile only)
  customizer: false, // Boolean: true, false. Customizer will be removed completely when set to false
  showCustomizer: true, // Boolean: true, false. Customizer will be opened (visible) first time app was loaded if set to true
  color: {
    primary: "#4caf50",
    success: "#4caf50",
    info: "#01BCD4",
    infoAlt: "#948aec",
    warning: "#ffc53d",
    danger: "#ff4d4f",
    text: "#3D4051",
    gray: "#EDF0F1"
  },
  settings: {
    layout: "1", // String: 1, 2, 3, 4 and add your own
    boxedLayout: false, // Boolean: true, false
    fixedSidenav: true, // Boolean: true, false
    fixedHeader: true, // Boolean: true, false
    collapsedNav: false, // Boolean: true, false
    offCanvasNav: false, // Boolean: true, false
    sidenavWidth: 240, // Number
    offCanvasMobileNav: true, // Boolean: true, false. Mobile only, by default, it's true (off canvas)
    colorOption: "23", // String: 11,12,13,14,15,16; 21,22,23,24,25,26; 31,32,33,34,35,36
    theme: "light", // (WIP) String: light, gray, dark

    showTemplate: false // Add original templete
  }
};

export default APPCONFIG;
