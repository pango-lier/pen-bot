import { useMutation } from "@apollo/client";
import { CREATE_NEW_GROUP } from "api/grapth/group/createNewGroup";
import React, { useEffect, useState } from "react";
import ReactSelect from "react-select";
import {
  Button,
  Form,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";
import { ACTION_ENUM } from "utility/enum/actions";
import {
  enumToFormatSelected,
  enumToFormatSelectOptions,
} from "utility/helper/enum";
import { notifyError, notifySuccess } from "utility/notify";
import { UserI } from "../../../columns";
import { IGroup } from "../columns";
import { GroupEnum } from "api/grapth/group/group.enum";
import { UPDATE_NEW_GROUP } from "api/grapth/group/updateGroup";
import { DELETE_GROUP } from "api/grapth/group/deleteGroup";

interface IModalGroupProps {
  user: UserI;
  row: IGroup | undefined;
  isOpenModalGroup: boolean;
  setIsOpenModalGroup: Function;
  action: ACTION_ENUM;
  onHandle: Function;
}
const ModalGroup = ({
  isOpenModalGroup,
  setIsOpenModalGroup,
  row,
  user,
  action,
  onHandle,
}: IModalGroupProps) => {
  const [name, setName] = useState<string>();
  const [secretKey, setSecretKey] = useState<string | undefined>();
  const [secretName, setSecretName] = useState<string | undefined>();
  const [groupType, setGroupType] = useState<GroupEnum>(GroupEnum.NONE);
  const [styleAction, setStyleAction] = useState<React.CSSProperties | undefined>();
  useEffect(() => {
    if (row) {
      setName(row.name);
      setSecretKey(row.secretKey);
      setSecretName(row.secretName);
      setGroupType(row.groupType);
    }
  }, [row]);
  useEffect(() => {
    if (action === ACTION_ENUM.Delete)
      setStyleAction({ pointerEvents: "none", opacity: "0.7" });
  }, [action]);

  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e && e?.target) {
      setName(e.target.value);
    }
  };
  const onChangeSecretKey = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e && e?.target) {
      setSecretKey(e.target.value);
    }
  };
  const onChangeSecretName = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e && e?.target) {
      setSecretName(e.target.value);
    }
  };

  const onChangeGroupType = (e) => {
    if (e) {
      setGroupType(e.value);
    }
  };

  const [createOneGroupDto] = useMutation(CREATE_NEW_GROUP, {
    onCompleted: (result) => {
      notifySuccess("Sig up is success.");
    },
    onError: (error) => {
      notifyError(error);
    },
  });

  const [updateOneGroupDto] = useMutation(UPDATE_NEW_GROUP, {
    onCompleted: (result) => {
      notifySuccess("Sig up is success.");
    },
    onError: (error) => {
      notifyError(error);
    },
  });

  const [deleteGroup] = useMutation(DELETE_GROUP, {
    onCompleted: (result) => {
      notifySuccess("Sig up is success.");
    },
    onError: (error) => {
      notifyError(error);
    },
  });

  const create: React.FormEventHandler<HTMLButtonElement> = async (
    e: React.FormEvent<HTMLButtonElement>
  ) => {
    try {
      switch (action) {
        case ACTION_ENUM.Create:
          const group = await createOneGroupDto({
            variables: {
              name,
              secretKey,
              secretName,
              groupType,
              userId: user.id,
            },
          });
          setIsOpenModalGroup(!isOpenModalGroup);
          onHandle(group.data.createOneGroupDto);

          break;
        case ACTION_ENUM.Edit:
          const update = await updateOneGroupDto({
            variables: {
              id: row?.id,
              name,
              secretKey,
              secretName,
              groupType,
              userId: user.id,
            },
          });
          setIsOpenModalGroup(!isOpenModalGroup);
          onHandle(update.data.updateOneGroupDto);

          break;
        case ACTION_ENUM.Delete:
          const destroy = await deleteGroup({
            variables: {
              id: row?.id,
            },
          });
          setIsOpenModalGroup(!isOpenModalGroup);
          onHandle(destroy.data.deleteOneGroupDto);

          break;
        default:
          break;
      }
    } catch (error) {
      notifyError(error);
    }
  };

  return (
    <div>
      <Modal
        isOpen={isOpenModalGroup}
        toggle={() => setIsOpenModalGroup(!isOpenModalGroup)}
      >
        <ModalHeader toggle={() => setIsOpenModalGroup(!isOpenModalGroup)}>
          Basic Modal
        </ModalHeader>
        <ModalBody>
          <Form className="auth-register-form mt-2" style={styleAction}>
            <div className="mb-1">
              <Label className="form-label" for="register-name">
                Name
              </Label>
              <Input
                value={name}
                type="text"
                id="register-name"
                placeholder="johndoe"
                autoFocus
                onChange={(e) => onChangeName(e)}
              />
            </div>
            <div className="mb-1">
              <Label className="form-label">Basic</Label>
              <ReactSelect
                value={enumToFormatSelected(GroupEnum, groupType)}
                className="react-select"
                options={enumToFormatSelectOptions(GroupEnum)}
                isClearable={false}
                onChange={(e) => onChangeGroupType(e)}
              />
            </div>
            <div className="mb-1">
              <Label className="form-label" for="register-secret-key">
                Secret Key
              </Label>
              <Input
                value={secretKey}
                type="text"
                id="register-secret-key"
                placeholder="secret key ..."
                onChange={(e) => onChangeSecretKey(e)}
              />
            </div>
            <div className="mb-1">
              <Label className="form-label" for="register-secret-key">
                Secret Name
              </Label>
              <Input
                value={secretName}
                type="text"
                id="register-secret-key"
                placeholder="secret key ..."
                onChange={(e) => onChangeSecretName(e)}
              />
            </div>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={(e) => create(e)}>
            Accept
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

//ModalGroup.propTypes = {};

export default ModalGroup;
