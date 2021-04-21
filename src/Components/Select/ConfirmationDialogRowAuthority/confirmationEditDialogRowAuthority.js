import { React, useState, useRef } from 'react';
import Button from "@material-ui/core/Button";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Dialog from "@material-ui/core/Dialog";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";

function ConfirmationEditDialogRowAuthority(props) {
    const { onClose, onOk, valueAuth, open, ...other } = props;
    const [value, setValue] = useState(valueAuth);
    const radioGroupRef = useRef(null);
    const [authorities] = useState([{ id: 1, authority: 'ROLE_ADMIN' }, { id: 2, authority: 'ROLE_USER' }]);

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
        setValue({id: parseInt(event.target.value)});
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
                    value={value.id.toString()}
                    onChange={handleChange}
                    name="authority"
                >
                    {authorities.map((elem) => (
                        <FormControlLabel
                            value={elem.id.toString()}
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

export default ConfirmationEditDialogRowAuthority;