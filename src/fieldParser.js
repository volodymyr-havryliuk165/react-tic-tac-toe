export default function parseField(field, size=3) {
  const outputField = [];
  for (let i = 0; i < field.length; i+=3) {
    outputField.push(field.slice(i, i+size));
  }
  return outputField;
}