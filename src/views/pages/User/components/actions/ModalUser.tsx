import { useMutation } from "@apollo/client";
import { CREATE_NEW_GROUP, GroupEnum } from "api/grapth/group/createNewGroup";
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
import {
  enumToFormatSelected,
  enumToFormatSelectOptions,
} from "utility/helper/enum";
import { notifyError, notifySuccess } from "utility/notify";
import { UserI } from "../columns";

interface IModalGroupProps {
  row: UserI | undefined;
  isOpenModalGroup: boolean;
  setIsOpenModalGroup: Function;
}
const ModalGroup = ({
  isOpenModalGroup,
  setIsOpenModalGroup,
  row,
}: IModalGroupProps) => {
  const [name, setName] = useState<String>("");
  const [secretKey, setSecretKey] = useState<String>("");
  const [secretName, setSecretName] = useState<String>("");
  const [groupType, setGroupType] = useState<GroupEnum>(GroupEnum.NONE);

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

  const create: React.FormEventHandler<HTMLButtonElement> = async (
    e: React.FormEvent<HTMLButtonElement>
  ) => {
    try {
      if (row) {
        const group = await createOneGroupDto({
          variables: {
            name,
            secretKey,
            secretName,
            groupType,
            userId: row.id,
          },
        });
      }
      setIsOpenModalGroup(!isOpenModalGroup);
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
