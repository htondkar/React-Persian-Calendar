export const toPersianDigit = a => {
  if (typeof a === 'number') {
    a = a.toString()
  }
  return a.replace(/\d+/g, function(digit) {
    var enDigitArr = []

    var peDigitArr = []

    for (let i = 0; i < digit.length; i++) {
      enDigitArr.push(digit.charCodeAt(i))
    }

    for (let j = 0; j < enDigitArr.length; j++) {
      peDigitArr.push(
        String.fromCharCode(enDigitArr[j] + (!!a && a === true ? 1584 : 1728))
      )
    }
    return peDigitArr.join('')
  })
}
