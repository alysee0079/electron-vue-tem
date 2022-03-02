function forbidWord(str) {
  str = str.replace(/\s/g, '')
  let num = ''
  if (/data/.test(str)) return false
  if (/@[a-z0-9]+\.[a-z]{2,4}$/g.test(str)) return true
  for (let i = 0; i < str.length + 1; i++) {
    if (!isNaN(str[i])) {
      num = num + str[i]
    } else {
      if (str[i] == '-') continue
      if (num && /^((13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8})$/.test(num)) {
        return true
      } else {
        num = ''
      }
    }
  }
  return false
}

export { forbidWord }
