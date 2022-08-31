import { Option } from './select'

const getOptionsFromObject = <T extends object>({ options, labelKey, valueKey }: {
  options: T[]
  labelKey: string
  valueKey: string
}): Array<Option<string>> => {
  return options.reduce((acc: Array<Option<string>>, option: T) => {
    const hasLabelKey = Object.prototype.hasOwnProperty.call(option, labelKey)
    const hasValueKey = Object.prototype.hasOwnProperty.call(option, valueKey)

    if (hasLabelKey && hasValueKey) {
      return [...acc, {
        value: option[valueKey],
        label: option[labelKey]
      }]
    }

    return acc
  }, [])
}

const getOptionsFromArray = <T extends number | string>({
  options
}: {
  options: T[]
}): Array<Option<number | string>> => {
  return options.map(option => (
    {
      value: option,
      label: option.toString()
    }
  ))
}

export { getOptionsFromObject, getOptionsFromArray }
