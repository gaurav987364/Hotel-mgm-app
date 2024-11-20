import styled from "styled-components";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

const FormRow = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 24rem 1fr 1.2fr;
  gap: 2.4rem;

  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

function CreateCabinForm() {
  const { register, handleSubmit, reset, getValues, formState } = useForm(); //react-hook-form
  const { errors } = formState; //react-hook-form error jo hme side me dikahne hai user agar galat form bharta hai to

  //create cabin
  const queryClient = useQueryClient();
  const { mutate, isLoading, isCreating } = useMutation({
    mutationFn: (newCabin) => createCabin(newCabin),
    onSuccess: () => {
      toast.success("New Cabin has been created"),
        queryClient.invalidateQueries({
          queryKey: ["cabins"],
        });
      reset(); //reset krdeta hai form ko after submit like clear fileds
    },
    onError: (err) => toast.error(err.message),
  });

  //handel our data and set in the mutate function
  //handeling form data and error handling
  const HandelOnSubmit = (data) => {
    //mutate(data);//this is for text 
    mutate({...data, image: data.image[0]}) //upload image to supbase
  }
  //ise se bi hm error show krwa sakte hai bs handelsubmit me onError pass krdoo
  // const onError = (error)=>{
  //   console.error(error);
  // }
  return (
    <Form onSubmit={handleSubmit(HandelOnSubmit)}>
      <FormRow>
        <Label htmlFor="name">Cabin name</Label>
        <Input
          type="text"
          id="name"
          disabled={isCreating}
          {...register("name", {
            required: "Name is required",
            min: {
              value: 1,
              message: "Name should be at least 1 characters long",
            },
          })}
        />
        {errors?.name?.message && <Error>{errors.name.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="maxCapacity">Maximum capacity</Label>
        <Input
          type="number"
          id="maxCapacity"
          disabled={isCreating}
          {...register("maxCapacity", {
            required: "Maximum capacity is required",
            min: {
              value: 1,
              message: "Maximum capacity should be at least 1",
            },
          })}
        />
        {errors?.maxCapacity?.message && (
          <Error>{errors.maxCapacity.message}</Error>
        )}
      </FormRow>

      <FormRow>
        <Label htmlFor="regularPrice">Regular price</Label>
        <Input
          type="number"
          id="regularPrice"
          disabled={isCreating}
          {...register("regularPrice", {
            required: "Regular price is required"
          })}
        />
        {errors?.regularPrice?.message && (
          <Error>{errors.regularPrice.message}</Error>
        )}
      </FormRow>

      <FormRow>
        <Label htmlFor="discount">Discount</Label>
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          disabled={isCreating}
          {...register("discount", {
            validate: (value) => {
              value < getValues().regularPrice ||
                "Discount should be less than regular price";
            },
          })}
        />
        {errors?.discount?.message && <Error>{errors.discount.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="description">Description for website</Label>
        <Textarea
          type="number"
          id="description"
          defaultValue=""
          disabled={isCreating}
          {...register("description", {
            required: "Add Something About Rooms🙂",
          })}
        />
        {errors?.description?.message && (
          <Error>{errors.description.message}</Error>
        )}
      </FormRow>

      <FormRow>
        <Label htmlFor="image">Cabin photo</Label>
        <FileInput id="image" accept="image/*" {...register('image',{
          required: "Uploads a photo of Cabin"
        })} />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! used to reset form */}
        <Button variation="secondary" size="medium" type="reset">
          Cancel
        </Button>
        <Button size="medium" variation="primary" disabled={isLoading}>
          Edit cabin
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
