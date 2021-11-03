import classes from "./CheckOut.module.css";
import { useRef, useState } from "react";

const isEmpty = (value) => value.trim() === "";
const isFiveChars = (value) => value.trim().length === 5;
const CheckOut = (props) => {
  const [formInputsValidity, setFormInputsValidity] = useState({
    name: true,
    street: true,
    city: true,
    postalCode: true
  });

  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postalInputRef = useRef();
  const cityInputRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();
    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredPostal = postalInputRef.current.value;
    const enteredCity = cityInputRef.current.value;

    const enteredNameValid = !isEmpty(enteredName);
    const enteredStreetValid = !isEmpty(enteredStreet);
    const enteredCityValid = !isEmpty(enteredCity);
    const enteredPostalValid = isFiveChars(enteredPostal);

    setFormInputsValidity({
      name: enteredNameValid,
      street: enteredStreetValid,
      city: enteredCityValid,
      postalCode: enteredPostalValid
    });
    console.log(formInputsValidity);
    const formIsvalid =
      enteredNameValid &&
      enteredStreetValid &&
      enteredCityValid &&
      enteredPostalValid;

    if (!formIsvalid) {
      //Submit Cart Data
      return;
    }
    props.onConfirm({
      name: enteredName,
      city: enteredCity,
      street: enteredStreet,
      postlCode: enteredPostal
    });
  };
  const nameControlClasses = `${classes.control} ${
    formInputsValidity.name ? "" : classes.invalid
  }`;
  const streetControlClasses = `${classes.control} ${
    formInputsValidity.street ? "" : classes.invalid
  }`;
  const postalControlClasses = `${classes.control} ${
    formInputsValidity.postalCode ? "" : classes.invalid
  }`;
  const cityControlClasses = `${classes.control} ${
    formInputsValidity.city ? "" : classes.invalid
  }`;

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameControlClasses}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameInputRef} />
        {!formInputsValidity.name && <p>Please Enter Valid Name!</p>}
      </div>
      <div className={streetControlClasses}>
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={streetInputRef} />
        {!formInputsValidity.street && <p>Please Enter Valid Street!</p>}
      </div>
      <div className={postalControlClasses}>
        <label htmlFor="postal">Postal Code</label>
        <input type="text" id="postal" ref={postalInputRef} />
        {!formInputsValidity.postalCode && (
          <p>Please Enter Valid Postal Code! </p>
        )}
      </div>
      <div className={cityControlClasses}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityInputRef} />
        {!formInputsValidity.city && <p>Please Enter Valid City! </p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default CheckOut;
