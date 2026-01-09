import slugify from "slugify";

export function slugifyURL(text: string) {
  if (!text) return "";

  // Normalize Vietnamese characters
  text = text
    .replace(/ơ|ở|ỡ|ợ|ớ|ờ/g, "o")
    .replace(/ư|ử|ữ|ự|ứ|ừ/g, "u")
    .replace(/á|à|ả|ã|ạ|ă|ắ|ằ|ẳ|ẵ|ặ/g, "a")
    .replace(/ấ|ầ|ẩ|ẫ|ậ/g, "a")
    .replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/g, "e")
    .replace(/í|ì|ỉ|ĩ|ị/g, "i")
    .replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ/g, "o")
    .replace(/ú|ù|ủ|ũ|ụ/g, "u")
    .replace(/ý|ỳ|ỷ|ỹ|ỵ/g, "y")
    .replace(/đ/g, "d");

  text = slugify(text, {
    replacement: "-",
    lower: true,
    locale: "vi",
    trim: true,
  });

  text = text.replace(/-+/g, "-");

  return text;
}
