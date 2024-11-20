import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  let { data, error } = await supabase.from("cabins").select("*");
  if (error) {
    console.log(error);
    throw new Error("Could not fetch cabins");
  }
  return data;
}

//mutation in react query / delete cabins

export async function deleteCabin(id) {
  let { data, error } = await supabase
    .from("cabins")
    .delete()
    .eq("id", id)
    .single();

  if (error) {
    console.log(error);
    throw new Error("Could not delete cabin");
  }
  return data;
}

//create cabin /edit // path of image to store :https://gekkjdhndagmiaytjzvl.supabase.co/storage/v1/object/public/cabins-images/cabin-001.jpg

export async function createEditCabin(newCabin, id) {
   //image process again with edit cabin
   const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

  //image processing login for create cabin
  let imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll("/", "");
  let imagePath = hasImagePath ? newCabin.image : `${supabaseUrl}/storage/v1/object/public/cabins-images/${imageName}`;

 
  //creating our query beacuse we want to crete cabin whene there is no id
  let query = supabase.from("cabins");
  //create cabin
  if(!id)
    query = query
    .insert([{ ...newCabin, image: imagePath }]);
    
  //edit cabin
  if(id) query = query.update({...newCabin, image: imagePath}).eq("id", id);

  const {data, error} = await query
    .select()
    .single();

  if (error) {
    console.log(error);
    throw new Error("Could not create cabin");
  }

  //if there is image path in the cabin then we return the data otherwise we upload the image
  if(hasImagePath) return data;


  //after the cabin is created we need to upload image
  const { error: storageError } = await supabase.storage
    .from("cabins-images")
    .upload(imageName, newCabin.image);

  //delete the cabin if there is error in uploading the images
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    console.log(storageError);
    throw new Error("Could not upload cabin image");
  }
  return data;
}
