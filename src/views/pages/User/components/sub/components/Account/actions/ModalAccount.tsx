import { useMutation } from "@apollo/client";
import { CREATE_ACCOUNT } from "api/grapth/account/createAccount";
import React, { useState } from "react";
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
import { notifyError, notifySuccess } from "utility/notify";
import { SubUserGroupI } from "../../columns";
import { IAccount } from "../components/columns";

interface IModalIAccountProps {
  account: IAccount | undefined;
  group: SubUserGroupI;
  isOpenModalGroup: boolean;
  setIsOpenModalGroup: Function;
}
const ModalAccount = ({
  isOpenModalGroup,
  setIsOpenModalGroup,
  group,
  account,
}: IModalIAccountProps) => {
  const [name, setName] = useState<String>("");
  const [active, setActive] = useState<number>(1);
  const [proxyId, setProxyId] = useState<String>("");
  const [proxyType, setProxyType] = useState<String>("");

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

  const [createOneAccountDto] = useMutation(CREATE_ACCOUNT, {
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
    await createOneAccountDto({
      variables: {
        name,
        active: active === 1,
        proxyId,
        proxyType,
        groupId: group.id,
      },
    });
    setIsOpenModalGroup(!isOpenModalGroup);
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
          <Form className="auth-register-form mt-2">
            <div className="mb-1">
              <Label className="form-label" for="register-name">
                Name
              </Label>
              <Input
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
                id="proxy-type"
                type="text"
                placeholder="proxy type ..."
                onChange={(e) => onChangeProxyType(e)}
              />
            </div>
            <div className="mb-1">
              <Label for="switch-primary" className="form-check-label">
                Primary
              </Label>
              <div className="form-switch form-check-primary">
                <Input
                  type="switch"
                  id="switch-primary"
                  name="primary"
                  value={active}
                  onChange={(e) => onChangeActive(e)}
                />
              </div>
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

export default ModalAccount;
