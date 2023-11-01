import './PermissionTableRow.css'
import { Checkbox } from '@mui/material';

const PermissionTableRow = (props) => {

    const addSelectedPermmision = (permission) => {

        const sortPermissions = (permission) => {
            const permissions_array = permission.split('');
            var valid_permission = ""
            if (permissions_array.length > 1) {
                if (permissions_array.includes("R")) {
                    valid_permission = valid_permission.concat("R")
                }
                if (permissions_array.includes("W")) {
                    valid_permission = valid_permission.concat("W")
                }
                if (permissions_array.includes("U")) {
                    valid_permission = valid_permission.concat("U")
                }
                if (permissions_array.includes("D")) {
                    valid_permission = valid_permission.concat("D")
                }
            } else {
                valid_permission = "R"
            }

            return valid_permission
        }


        props.setPermission((prevState) => ({
            ...prevState,
            member_permission: {
                ...prevState.member_permission,
                [props.permission]: sortPermissions(prevState.member_permission[props.permission].concat(permission))
            }

        }))
    }

    const replaceSelectedPermmision = (permission) => {
        props.setPermission((prevState) => ({
            ...prevState,
            member_permission: {
                ...prevState.member_permission,
                [props.permission]: prevState.member_permission[props.permission].replace(permission, "")
            }
        }))
    }

    return (
        <tr align="center" className="permissions-table-data-row" >
            <td className="permissions-table-data permissions-table-data-lbl"><p>{props.permission}</p></td>
            <td className="permissions-table-data"><Checkbox onChange={(e) => {
                if (e.target.checked) {
                    addSelectedPermmision("R")
                } else {
                    replaceSelectedPermmision("R")
                }
            }} /></td>
            <td className="permissions-table-data" onChange={(e) => {
                if (e.target.checked) {
                    addSelectedPermmision("W")
                } else {
                    replaceSelectedPermmision("W")
                }
            }} ><Checkbox /></td>
            <td className="permissions-table-data" onChange={(e) => {
                if (e.target.checked) {
                    addSelectedPermmision("D")
                } else {
                    replaceSelectedPermmision("D")
                }
            }}><Checkbox /></td>
            <td className="permissions-table-data" onChange={(e) => {
                if (e.target.checked) {
                    addSelectedPermmision("U")
                } else {
                    replaceSelectedPermmision("U")
                }
            }}><Checkbox /></td>
        </tr>
    )
}
export default PermissionTableRow;