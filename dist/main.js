/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ (function() {

eval("// The svg\n\nconst width = 900;\nconst height = 600;\nconst svg = d3.select(\"svg\").attr(\"width\", width).attr(\"height\", height);\n\n// Map and projection. Try:  d3.geoAiry() / d3.geoAitoff() / d3.geoArmadillo() / d3.geoAugust() / d3.geoAzimuthalEqualArea() / d3.geoAzimuthalEquidistant() and more\nconst projection = d3.geoMercator().scale(140).translate([width / 2, height / 1.5]);\n\n// Load external data and boot\nd3.json(\"https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson\").then(function (data) {\n  // Draw the map\n  const countries = svg.append(\"g\").selectAll(\"path\").data(data.features).join(\"path\").attr('class', 'country').attr(\"d\", d3.geoPath().projection(projection));\n});//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvaW5kZXguanMuanMiLCJuYW1lcyI6WyJ3aWR0aCIsImhlaWdodCIsInN2ZyIsImQzIiwic2VsZWN0IiwiYXR0ciIsInByb2plY3Rpb24iLCJnZW9NZXJjYXRvciIsInNjYWxlIiwidHJhbnNsYXRlIiwianNvbiIsInRoZW4iLCJkYXRhIiwiY291bnRyaWVzIiwiYXBwZW5kIiwic2VsZWN0QWxsIiwiZmVhdHVyZXMiLCJqb2luIiwiZ2VvUGF0aCJdLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZ2xvYmFsY292aWR0cmFja2VyLy4vc3JjL2luZGV4LmpzP2I2MzUiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gVGhlIHN2Z1xuXG5jb25zdCB3aWR0aCA9IDkwMDtcbmNvbnN0IGhlaWdodCA9IDYwMDsgXG4gICAgXG5jb25zdCBzdmcgPSBkMy5zZWxlY3QoXCJzdmdcIikuYXR0cihcIndpZHRoXCIsIHdpZHRoKS5hdHRyKFwiaGVpZ2h0XCIsIGhlaWdodCk7XG5cbi8vIE1hcCBhbmQgcHJvamVjdGlvbi4gVHJ5OiAgZDMuZ2VvQWlyeSgpIC8gZDMuZ2VvQWl0b2ZmKCkgLyBkMy5nZW9Bcm1hZGlsbG8oKSAvIGQzLmdlb0F1Z3VzdCgpIC8gZDMuZ2VvQXppbXV0aGFsRXF1YWxBcmVhKCkgLyBkMy5nZW9BemltdXRoYWxFcXVpZGlzdGFudCgpIGFuZCBtb3JlXG5jb25zdCBwcm9qZWN0aW9uID0gZDMuZ2VvTWVyY2F0b3IoKVxuICAgIC5zY2FsZSgxNDApXG4gICAgLnRyYW5zbGF0ZShbd2lkdGggLyAyLCBoZWlnaHQgLyAxLjVdKVxuXG4vLyBMb2FkIGV4dGVybmFsIGRhdGEgYW5kIGJvb3RcbmQzLmpzb24oXCJodHRwczovL3Jhdy5naXRodWJ1c2VyY29udGVudC5jb20vaG9sdHp5L0QzLWdyYXBoLWdhbGxlcnkvbWFzdGVyL0RBVEEvd29ybGQuZ2VvanNvblwiKS50aGVuKCBmdW5jdGlvbihkYXRhKSB7XG5cbiAgICAvLyBEcmF3IHRoZSBtYXBcbiAgICBjb25zdCBjb3VudHJpZXMgPSBzdmcuYXBwZW5kKFwiZ1wiKVxuICAgICAgICAuc2VsZWN0QWxsKFwicGF0aFwiKVxuICAgICAgICAuZGF0YShkYXRhLmZlYXR1cmVzKVxuICAgICAgICAuam9pbihcInBhdGhcIilcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdjb3VudHJ5JylcbiAgICAgICAgICAgIC5hdHRyKFwiZFwiLCBkMy5nZW9QYXRoKClcbiAgICAgICAgICAgICAgICAucHJvamVjdGlvbihwcm9qZWN0aW9uKVxuICAgICAgICAgICAgKVxuICAgICAgICAgICAgXG59KSJdLCJtYXBwaW5ncyI6IkFBQUE7O0FBRUEsTUFBTUEsS0FBSyxHQUFHLEdBQUc7QUFDakIsTUFBTUMsTUFBTSxHQUFHLEdBQUc7QUFFbEIsTUFBTUMsR0FBRyxHQUFHQyxFQUFFLENBQUNDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQ0MsSUFBSSxDQUFDLE9BQU8sRUFBRUwsS0FBSyxDQUFDLENBQUNLLElBQUksQ0FBQyxRQUFRLEVBQUVKLE1BQU0sQ0FBQzs7QUFFeEU7QUFDQSxNQUFNSyxVQUFVLEdBQUdILEVBQUUsQ0FBQ0ksV0FBVyxFQUFFLENBQzlCQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQ1ZDLFNBQVMsQ0FBQyxDQUFDVCxLQUFLLEdBQUcsQ0FBQyxFQUFFQyxNQUFNLEdBQUcsR0FBRyxDQUFDLENBQUM7O0FBRXpDO0FBQ0FFLEVBQUUsQ0FBQ08sSUFBSSxDQUFDLHFGQUFxRixDQUFDLENBQUNDLElBQUksQ0FBRSxVQUFTQyxJQUFJLEVBQUU7RUFFaEg7RUFDQSxNQUFNQyxTQUFTLEdBQUdYLEdBQUcsQ0FBQ1ksTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUM1QkMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUNqQkgsSUFBSSxDQUFDQSxJQUFJLENBQUNJLFFBQVEsQ0FBQyxDQUNuQkMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUNSWixJQUFJLENBQUMsT0FBTyxFQUFFLFNBQVMsQ0FBQyxDQUN4QkEsSUFBSSxDQUFDLEdBQUcsRUFBRUYsRUFBRSxDQUFDZSxPQUFPLEVBQUUsQ0FDbEJaLFVBQVUsQ0FBQ0EsVUFBVSxDQUFDLENBQzFCO0FBRWIsQ0FBQyxDQUFDIn0=\n//# sourceURL=webpack-internal:///./src/index.js\n");

/***/ }),

/***/ "./src/index.scss":
/*!************************!*\
  !*** ./src/index.scss ***!
  \************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvaW5kZXguc2Nzcy5qcyIsIm1hcHBpbmdzIjoiO0FBQUEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9nbG9iYWxjb3ZpZHRyYWNrZXIvLi9zcmMvaW5kZXguc2Nzcz85NzQ1Il0sInNvdXJjZXNDb250ZW50IjpbIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/index.scss\n");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval-source-map devtool is used.
/******/ 	__webpack_modules__["./src/index.js"](0, {}, __webpack_require__);
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/index.scss"](0, __webpack_exports__, __webpack_require__);
/******/ 	
/******/ })()
;