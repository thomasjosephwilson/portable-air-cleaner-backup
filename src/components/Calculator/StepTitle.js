import './Calculator.css'

export function StepTitle(props) {
    return (
        <div id="title-wrapper">
            <div id="step-counter">
                <p id="step-counter-title">Step {props.currentStep} of {props.totalSteps}</p>
            </div>
            <div id="step-title-wrapper">
                <h3 id="step-title">{props.title}</h3>
                <div id="underline-rect"></div>
            </div>
        </div>
    )
}