import { useState } from "react";

import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useUserdetail } from "./useUserDetail";
import { useUpdate } from "./useUpdate";

function UpdateUserDataForm() {
  const {
    user: {
      email,
      user_metadata: { fullName: currentFullName },
    },
  } = useUserdetail();

  const { updateUser, isUpdating } = useUpdate();

  // Ensure fullName is initialized with a string value
  const [fullName, setFullName] = useState(currentFullName || ""); 
  const [avatar, setAvatar] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();
    if (!fullName) return;
    updateUser({ fullName, avatar }, {
      onSuccess: () => {
        setAvatar(null);
        e.target.reset();
      },
    });
  }

  function handleCancel() {
    setFullName(currentFullName || ""); // Ensure fullName is reset with a string value
    setAvatar(null);
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRow label="Email address">
        <Input value={email} disabled />
      </FormRow>

      <FormRow label="Full name">
        <Input
          type="text"
          value={fullName}
          disabled={isUpdating}
          onChange={(e) => setFullName(e.target.value)}
          id="fullName"
        />
      </FormRow>
      
      <FormRow label="Avatar image">
        <FileInput
          id="avatar"
          accept="image/*"
          disabled={isUpdating}
          onChange={(e) => setAvatar(e.target.files[0])}
        />
      </FormRow>

      <FormRow>
        <Button onClick={handleCancel} type="reset" size="medium" variation="secondary">
          Cancel
        </Button>
        <Button variation="primary" size="medium">
          Update account
        </Button>
      </FormRow>
    </Form>
  );
}

export default UpdateUserDataForm;
