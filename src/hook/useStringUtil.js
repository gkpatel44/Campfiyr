export default function useStringUtil() {
  function isEmptyString(str) {
    return !str || /^\s*$/.test(str) || str.length === 0;
  }

  function isString(str) {
    // may never use this since formik package has a string util of its own
    return typeof str === "string" || str instanceof String;
  }

  return { isEmptyString, isString };
}
