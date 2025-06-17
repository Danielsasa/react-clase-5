function InputNumber({ value, setValue, disabled }) {
  return (
    <input
      type="number"
      value={value}
      onChange={e => setValue(e.target.value)}
      disabled={disabled}
      placeholder="Escribe un número"
    />
  )
}

export default InputNumber