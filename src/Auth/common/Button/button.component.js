import React from 'react'

export const Button = (props) => {
    console.log('button is validadas', props.isValidForm)
    console.log('button is submitas', props.isSubmitting)
    const enabledLabel = props.enabledLabel || 'submit';
    const disabledLabel = props.disabledLabel || 'submitting';
    let btn = props.isSubmitting
    ? <button disabled  type="submit" className="btn btn-primary m-t-10">{disabledLabel}</button>
    : <button disabled={!props.isValidForm} type="submit" className="btn btn-primary m-t-10">{enabledLabel}</button>
    return btn
}
