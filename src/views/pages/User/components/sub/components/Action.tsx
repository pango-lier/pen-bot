import { useState } from "react";
import { Edit, MoreVertical, Trash } from "react-feather";
import {
  Button,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from "reactstrap";
import { ButtonTooltip } from "views/pages/components/ButtonTooltip";
import ModalGroup from "./actions/ModalAccount";
import { SubUserGroupI } from "./columns";

const Action = ({ group }: { group: SubUserGroupI }) => {
  const [isOpenModalGroup, setIsOpenModalGroup] = useState<boolean>(false);
  const onCreateNewGroup = (group) => {
    setIsOpenModalGroup(true);
  };
  const onSetIsOpenModalGroup = (isOpen: boolean) => {
    setIsOpenModalGroup(isOpen);
  };
  return (
    <>
      <div className="d-flex justify-content-around align-content-between flex-nowrap">
        <ButtonTooltip
          id={"create-account" + group.id}
          message={"Create new account"}
          onHandle={() => onCreateNewGroup(group)}
          icon={<i className="fa-solid fa-pen" style={{ fontSize: 12 }} />}
          color="primary"
        />
        <ButtonTooltip
          color="success"
          id={"create-account" + group.id}
          message={"Create new account"}
          onHandle={() => onCreateNewGroup(group)}
          icon={<i className="fa-solid fa-pen" style={{ fontSize: 12 }} />}
        />
        <ButtonTooltip
          id={"create-account" + group.id}
          message={"Create new account"}
          onHandle={() => onCreateNewGroup(group)}
          icon={<i className="fa-solid fa-pen" style={{ fontSize: 12 }} />}
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
      </div>
      {isOpenModalGroup && (
        <ModalGroup
          group={group}
          isOpenModalGroup={isOpenModalGroup}
          setIsOpenModalGroup={onSetIsOpenModalGroup}
        />
      )}
    </>
  );
};

export default Action;
