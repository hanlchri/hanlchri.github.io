var _0x4212 = [
  "active",
  ".hamburger",
  "toggle",
  "menu-toggle",
  "frictionY",
  "nav\x20ul\x20a",
  "getElementById",
  "classList",
  "addEventListener",
  "querySelector",
  "invertY",
  "querySelectorAll",
];
(function (_0x1d45a0, _0x82f410) {
  var _0x42126f = function (_0x4015e6) {
    while (--_0x4015e6) {
      _0x1d45a0["push"](_0x1d45a0["shift"]());
    }
  };
  _0x42126f(++_0x82f410);
})(_0x4212, 0xc2);
var _0x4015 = function (_0x1d45a0, _0x82f410) {
  _0x1d45a0 = _0x1d45a0 - 0x198;
  var _0x42126f = _0x4212[_0x1d45a0];
  return _0x42126f;
};
var _0x2389fa = _0x4015,
  scene = document["getElementById"]("parallax"),
  parallaxInstance = new Parallax(scene);
(parallaxInstance["invertX"] = !![]),
  (parallaxInstance[_0x2389fa(0x1a0)] = !![]),
  (parallaxInstance["scalarX"] = 0xa),
  (parallaxInstance[_0x2389fa(0x19a)] = 0.1);
var hamburger = document[_0x2389fa(0x19f)](_0x2389fa(0x1a3)),
  menuToggle = document["getElementById"](_0x2389fa(0x199));
(menuItems = document[_0x2389fa(0x1a1)](_0x2389fa(0x19b))),
  menuToggle[_0x2389fa(0x19e)]("click", function () {
    var _0x1265e7 = _0x2389fa;
    hamburger[_0x1265e7(0x19d)][_0x1265e7(0x198)]("is-active"), openNav();
  });
function openNav() {
  var _0x5451cd = _0x2389fa;
  document[_0x5451cd(0x19c)]("nav")["classList"]["toggle"](_0x5451cd(0x1a2));
}




