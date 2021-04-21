import { React, useState, useRef } from 'react';
import Button from "@material-ui/core/Button";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Dialog from "@material-ui/core/Dialog";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";

function ConfirmationDialogRowEnabled(props) {
    const { onClose, onOk, open, ...other } = props;
    const [value, setValue] = useState(1);
    const radioGroupRef = useRef(null);
    const enabled = [
        0,
        1
    ];

    const handleEntering = () => {
        if (radioGroupRef.current != null) {
            radioGroupRef.current.focus();
        }
    };

    const handleCancel = () => {
        console.log(other)
        onClose();
    };

    const handleOk = () => {
        onOk(parseInt(value));
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
        >
            <DialogContent dividers>
                <RadioGroup
                    ref={radioGroupRef}
                    value={value.toString()}
                    onChange={handleChange}
                    name="enabled"
                >
                    {enabled.map((elem) => (
                        <FormControlLabel
                            value={elem.toString()}
                            key={elem}
                            control={<Radio />}
                            label={elem}
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

export default ConfirmationDialogRowEnabled;