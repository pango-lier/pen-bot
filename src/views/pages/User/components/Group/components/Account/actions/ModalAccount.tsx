import { useMutation } from "@apollo/client";
import { CREATE_ACCOUNT } from "api/grapth/account/createAccount";
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
import { notifyError, notifySuccess } from "utility/notify";
import { IGroup } from "../../columns";
import { IAccount } from "../components/columns";
import { UPDATE_ACCOUNT } from "api/grapth/account/updateAccount";
import { DELETE_ACCOUNT } from "api/grapth/account/deleteAccount";

interface IModalIAccountProps {
  row: IAccount | undefined;
  group: IGroup;
  isOpenModalGroup: boolean;
  setIsOpenModalGroup: Function;
  onHandleModal: Function;
  action: ACTION_ENUM;
}
const ModalAccount = ({
  isOpenModalGroup,
  setIsOpenModalGroup,
  group,
  row,
  onHandleModal,
  action,
}: IModalIAccountProps) => {
  const [name, setName] = useState<string>("");
  const [active, setActive] = useState<number>(1);
  const [proxyId, setProxyId] = useState<string>("");
  const [proxyType, setProxyType] = useState<string>("");
  const [styleAction, setStyleAction] = useState<
    React.CSSProperties | undefined
  >();

  useEffect(() => {
    console.log(row);
    if (row) {
      setName(row.name);
      setActive(row.active ? 1 : 0);
      setProxyId(row.proxyId);
      setProxyType(row.proxyType);
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
  const onChangeActive = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e && e?.target) {
      setActive(parseInt(e.target.value));
    }
  };
  const onChangeProxyId = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e && e?.target) {
      setProxyId(e.target.value);
    }
  };

  const onChangeProxyType = (e) => {
    if (e && e?.target) {
      setProxyType(e.value);
    }
  };

  const [createAction] = useMutation(CREATE_ACCOUNT, {
    onCompleted: (result) => {
      notifySuccess("Create is success.");
    },
    onError: (error) => {
      notifyError(error);
    },
  });
  const [updateAction] = useMutation(UPDATE_ACCOUNT, {
    onCompleted: (result) => {
      notifySuccess("Update is success.");
    },
    onError: (error) => {
      notifyError(error);
    },
  });

  const [deleteAction] = useMutation(DELETE_ACCOUNT, {
    onCompleted: (result) => {
      notifySuccess("Delete is success.");
    },
    onError: (error) => {
      notifyError(error);
    },
  });

  const onAccept: React.FormEventHandler<HTMLButtonElement> = async (
    e: React.FormEvent<HTMLButtonElement>
  ) => {
    switch (action) {
      case ACTION_ENUM.Create:
        const account = await createAction({
          variables: {
            name,
            active: active === 1,
            proxyId,
            proxyType,
            groupId: group.id,
          },
        });
        setIsOpenModalGroup(!isOpenModalGroup);
        onHandleModal(account.data.createOneAccountDto);
        break;
      case ACTION_ENUM.Edit:
        const update = await updateAction({
          variables: {
            id: row?.id,
            name,
            active: active === 1,
            proxyId,
            proxyType,
            groupId: group.id,
          },
        });
        setIsOpenModalGroup(!isOpenModalGroup);
        onHandleModal(update.data.updateOneAccountDto);

        break;
      case ACTION_ENUM.Delete:
        const destroy = await deleteAction({
          variables: {
            id: row?.id,
          },
        });
        setIsOpenModalGroup(!isOpenModalGroup);
        onHandleModal(destroy.data.deleteOneAccountDto);

        break;
      default:
        break;
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
                defaultValue={name}
                type="text"
                id="register-name"
                placeholder="johndoe"
                autoFocus
                onChange={(e) => onChangeName(e)}
              />
            </div>

            <div className="mb-1">
              <Label className="form-label" for="proxy-id">
                Proxy Id
              </Label>
              <Input
                defaultValue={proxyId}
                id="proxy-id"
                type="text"
                placeholder="Proxy Id ..."
                onChange={(e) => onChangeProxyId(e)}
              />
            </div>
            <div className="mb-1">
              <Label className="form-label" for="proxy-type">
                Proxy Type
              </Label>
              <Input
                defaultValue={proxyType}
                id="proxy-type"
                type="text"
                placeholder="proxy type ..."
                onChange={(e) => onChangeProxyType(e)}
              />
            </div>
            <div className="mb-1">
              <Label for="switch-primary" className="form-check-label">
                Active account
              </Label>
              <div className="form-switch form-check-primary">
                <Input
                  type="switch"
                  id="switch-primary"
                  name="primary"
                  defaultValue={active}
                  onChange={(e) => onChangeActive(e)}
                />
              </div>
            </div>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={(e) => onAccept(e)}>
            Accept
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

//ModalGroup.propTypes = {};

export default ModalAccount;
