export interface CheckBoxModelInterface {
    ischecked: boolean,
    text: string,
    value: string
}
export interface FilterModelInterface {
    [key: string]: CheckBoxModelInterface[]
}
export interface FilterSelectedInterface {
    [key: string]: string[]
}
