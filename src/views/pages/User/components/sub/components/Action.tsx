import { Edit, Edit2, MoreVertical, Trash, Trash2 } from "react-feather";
import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from "reactstrap";
import { ButtonTooltip } from "views/pages/components/ButtonTooltip";

const Action = ({ row, onEditHandle, onDeleteHandle }: any) => {
  return (
    <>
      <div className="d-flex justify-content-around align-content-between flex-nowrap">
        <ButtonTooltip
          color="primary"
          id={"create-account" + row.id}
          message={"Create new account"}
          onHandle={() => onEditHandle(row)}
          icon={<Edit2 size={12} />}
        />
        <ButtonTooltip
          id={"create-account" + row.id}
          message={"Create new account"}
          onHandle={() => onDeleteHandle(row)}
          icon={<Trash2 size={12}  />}
          color="danger"
        />
        <UncontrolledDropdown>
          <DropdownToggle
            className="icon-btn hide-arrow"
            color="transparent"
            size="sm"
            caret
          >
            <MoreVertical size={15} />
          </DropdownToggle>
          <DropdownMenu container={"body"}>
            <DropdownItem href="/" onClick={(e) => onEditHandle(row)}>
              <Edit className="me-50" size={15} />{" "}
              <span className="align-middle">Edit</span>
            </DropdownItem>
            <DropdownItem href="/" onClick={(e) => onDeleteHandle(row)}>
              <Trash className="me-50" size={15} />{" "}
              <span className="align-middle">Delete</span>
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </div>
    </>
  );
};

export default Action;
