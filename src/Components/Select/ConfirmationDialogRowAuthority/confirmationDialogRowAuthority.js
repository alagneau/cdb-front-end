import { React, useState, useEffect, useRef } from 'react';
import Button from "@material-ui/core/Button";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Dialog from "@material-ui/core/Dialog";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";

function ConfirmationDialogRowAuthority(props) {
    const { onClose, onOk, value: valueProp, open, ...other } = props;
    const [value, setValue] = useState(valueProp);
    const radioGroupRef = useRef(null);
    const [authorities, setAuthorities] = useState(props.authorities);

    useEffect(() => {
        if (!open) {
            setValue(valueProp);
        }
    }, [valueProp, open]);

    const handleEntering = () => {
        if (radioGroupRef.current != null) {
            radioGroupRef.current.focus();
        }
    };

    const handleCancel = () => {
        onClose();
    };

    const handleOk = () => {
        onOk(value);
    };

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    return (
        <Dialog
            disableBackdropClick
            disableEscapeKeyDown
            maxWidth="xs"
            onEntering={handleEntering}
            open={open}
            {...other}
        >
           <DialogContent dividers>
                <RadioGroup
                    ref={radioGroupRef}
                    value={value}
                    onChange={handleChange}
                    name="authority"
                >
                    {authorities.map((elem) => (
                        <FormControlLabel
                            value={elem.id}
                            key={elem.id}
                            control={<Radio />}
                            label={elem.authority}
                        />
                    ))}
                </RadioGroup>
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={handleCancel} color="primary">
                    Cancel
          </Button>
                <Button onClick={handleOk} color="primary">
                    Ok
          </Button>
            </DialogActions>
        </Dialog>
    );
}

export default ConfirmationDialogRowAuthority;