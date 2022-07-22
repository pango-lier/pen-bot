import { Edit, MoreVertical, Trash } from "react-feather";
import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from "reactstrap";

const Action = () => {
  return (
    <>
      <UncontrolledDropdown>
        <DropdownToggle
          className="icon-btn hide-arrow"
          color="transparent"
          size="sm"
          caret
        >
          <MoreVertical size={15} />
        </DropdownToggle>
        <DropdownMenu container={'body'}>
          <DropdownItem href="/" onClick={(e) => e.preventDefault()}>
            <Edit className="me-50" size={15} />{" "}
            <span className="align-middle">Edit</span>
          </DropdownItem>
          <DropdownItem href="/" onClick={(e) => e.preventDefault()}>
            <Trash className="me-50" size={15} />{" "}
            <span className="align-middle">Delete</span>
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
    </>
  );
};

export default Action;
