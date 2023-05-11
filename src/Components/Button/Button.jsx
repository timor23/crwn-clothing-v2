import './button.styles.scss'

const BUTTON_TYPE_CLASSES = {
    google: 'google-Authentication',
    inverted: 'inverted'
}
export const Button = ({ children, buttonType }) => {
    return (
        <button className={`${BUTTON_TYPE_CLASSES[buttonType]} button-container`}>{children}</button>
    )
}