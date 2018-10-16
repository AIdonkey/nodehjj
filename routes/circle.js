const PI = 3.14;
let area = function (r) {
  return PI * r*r
}
let circumference = function (r) {
  return 2 * PI * r
}
module.exports = ({
  area: area,
  circumference: circumference
})
