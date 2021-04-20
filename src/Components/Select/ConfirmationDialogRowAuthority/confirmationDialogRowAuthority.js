import { React, useState, useEffect, useRef } from 'react';
import Button from "@material-ui/core/Button";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Dialog from "@material-ui/core/Dialog";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";

function ConfirmationDialogRowAuthority(props) {
    const { onClose, onOk, open, ...other } = props;
    const [value, setValue] = useState(1);
    const radioGroupRef = useRef(null);
    const [authorities, setAuthorities] = useState([{ id: 1, authority: 'ROLE_ADMIN' }, { id: 2, authority: 'ROLE_USER' }]);

    const handleEntering = () => {
        if (radioGroupRef.current != null) {
            radioGroupRef.current.focus();
        }
    };

    const handleCancel = () => {
        onClose();
    };

    const handleOk = () => {
        onOk(parseInt(value));
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
        >
            <DialogContent dividers>
                {value ? <RadioGroup
                    ref={radioGroupRef}
                    value={value.toString()}
                    onChange={handleChange}
                    name="authority"
                >
                    {authorities.map((elem) => (
                        <FormControlLabel
                            value={elem.id.toString()}
                            control={<Radio />}
                            label={elem.authority}
                        />
                    ))}
                </RadioGroup>
                    :
                    <RadioGroup
                        ref={radioGroupRef}
                        value={authorities[0].id.toString()}
                        onChange={handleChange}
                        name="authority"
                    >

                        {authorities.map((elem) => (
                            <FormControlLabel
                                value={elem.id.toString()}
                                control={<Radio />}
                                label={elem.authority}
                            />
                        ))}
                    </RadioGroup>}
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