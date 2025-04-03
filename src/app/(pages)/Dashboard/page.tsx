"use client";

import {
  Button,
  Dropdown,
  DropdownItem,
  FileInput,
  Label,
  ListGroup,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  TextInput,
} from "flowbite-react";
import {
  Accordion,
  AccordionContent,
  AccordionPanel,
  AccordionTitle,
} from "flowbite-react";
import { checkToken, getBlogItemsByUserId, getToken, loggedInData } from "@/utils/DataServices";
import React, { useEffect, useState } from "react";
import { IBlogItems } from "@/utils/Interfaces";
import { useRouter } from "next/navigation";
import BlogEntries from "@/utils/BlogEntries.json"

const page = () => {
  const { push } = useRouter();
  const [openModal, setOpenModal] = useState<boolean>(false);

  //These use states will be for our forms
  const [blogTitle, setBlogTitle] = useState<string>("");
  const [blogImage, setBlogImage] = useState<any>("");
  const [blogDescription, setBlogDescription] = useState<string>("");
  const [blogCategory, setBlogCategory] = useState<string>("");
  const [blogId, setBlogId] = useState<number>(0);
  const [blogUserId, setBlogUSerId] = useState<number>(0);
  const [blogPublisherName, setBlogPublisherName] = useState<string>("");

  const [edit, setEdit] = useState<boolean>(false);

  const [blogItems, setBlogItems] = useState<IBlogItems[]>(BlogEntries);

  useEffect(() => {

    const getLoggedInData = async() => {
      //Get the user's information
      const loggedIn = loggedInData();
      console.log(loggedIn)
      console.log(getToken())
      setBlogId(loggedIn.id);
      setBlogPublisherName(loggedIn.username);

      //Get the user's Blog Items
      const userBlogItems = await getBlogItemsByUserId(loggedIn.id, getToken());
      console.log(userBlogItems);
      
      //Set user's blog items inside our 
      setBlogItems(userBlogItems);

    }


    if (!checkToken) {
      //push to login page
      push("/");
    } else {
      // get user data / login logic function
      getLoggedInData()
    }
  }, []);

  // --------------------------- FORM FUNCTIONS -------------------------------------------

  const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) =>
    setBlogTitle(e.target.value);
  const handleDescription = (e: React.ChangeEvent<HTMLInputElement>) =>
    setBlogDescription(e.target.value);
  const handleCategory = (categories: string) => setBlogCategory(categories);
  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {};

  // ------------------------ACCORDION FUNCTIONS --------------------------------------------

  const handleShow = () => {
    setOpenModal(true);
    setEdit(false);
  };

  const handleEdit = (items: IBlogItems) => {
    setOpenModal(true);
    setEdit(true);
  };

  const handlePublish = async (items: IBlogItems) => {
    items.isPublished = !items.isPublished;
  };

  const handleDelete = async (items: IBlogItems) => {
    items.isDeleted = true;
  };

  // ------------------------ SAVE FUNCTION ------------------------------------

  const handleSave = (e: React.MouseEvent<HTMLButtonElement>) => {
    const item = {};
    setOpenModal(false);

    if (edit) {
      //our edit logic will go here
    } else {
      //our add logic will go here
    }
  };

  return (
    <main className="flex min-h-screen flex-col p-24">
      <div className="flex flex-col items-center mb-10">
        <h1 className="text-center text-3xl">Dashboard Page</h1>
        <Button onClick={() => setOpenModal(true)}>Add Blog</Button>
        <Modal show={openModal} onClose={() => setOpenModal(false)}>
          <ModalHeader>{edit ? "Edit Blog Post" : "Add Blog Post"}</ModalHeader>
          <ModalBody>
            <form className="flex max-w-md flex-col gap-4">
              <div>
                <div className="mb-2 block">
                  {/* Title, Image, Description Category, Tags */}
                  <Label htmlFor="Title">Title</Label>
                </div>
                <TextInput
                  id="Title"
                  type="text"
                  placeholder="Title"
                  onChange={handleTitle}
                  required
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="Description">Description</Label>
                </div>
                <TextInput
                  id="Description"
                  placeholder="Description"
                  type="text"
                  onChange={handleDescription}
                  required
                />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <Dropdown label="Categories" dismissOnClick={true}>
                    <DropdownItem onClick={() => handleCategory("Jiu Jitsu")}>Jiu Jitsu</DropdownItem>
                    <DropdownItem onClick={() => handleCategory("Boxing")}>Boxing</DropdownItem>
                    <DropdownItem onClick={() => handleCategory("Karate")}>Karate</DropdownItem>
                  </Dropdown>
                </div>
                <div className="mb-2 block">
                  <Label htmlFor="Picture">Image</Label>
                </div>
                <FileInput
                  id="Picture"
                  accept="image/png, image/jpg"
                  placeholder="Choose Picture"
                  onChange={handleImage}
                />
              </div>
            </form>
          </ModalBody>
          <ModalFooter>
            <Button onClick={handleSave}>
              Save and publish
            </Button>
            <Button onClick={handleSave}>Save</Button>
            <Button color="gray" onClick={() => setOpenModal(false)}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
        <Accordion alwaysOpen className="w-3xl mt-5">
          <AccordionPanel>
            <AccordionTitle>Published Blog Items</AccordionTitle>
            <AccordionContent>
              <ListGroup>
                {blogItems.map((items: IBlogItems, idx: number)=>{
                  return (
                    <div key={idx}>
                      {
                        items.isPublished && !items.isDeleted && (
                          <div className="flex flex-col p-10">
                            <h2 className="text-3xl">{items.title}</h2>
                            <div className="flex flex-row space-x-3">
                              <Button color="blue" onClick={()=>handleEdit(items)}>Edit</Button>
                              <Button color="red" onClick={()=>handleDelete(items)}>Delete</Button>
                              <Button color="yellow" onClick={()=>handlePublish(items)}>UnPublish</Button>
                            </div>
                          </div>
                        )
                      }
                    </div>
                  )
                  })
                }
              </ListGroup>
            </AccordionContent>
          </AccordionPanel>
          <AccordionPanel>
            <AccordionTitle>Unpublished Blog Items</AccordionTitle>
            <AccordionContent>
              <ListGroup>
              {blogItems.map((items: IBlogItems, idx: number)=>{
                  return (
                    <div key={idx}>
                      {
                        !items.isPublished && !items.isDeleted && (
                          <div className="flex flex-col p-10">
                            <h2 className="text-3xl">{items.title}</h2>
                            <div className="flex flex-row space-x-3">
                              <Button color="blue" onClick={()=>handleEdit(items)}>Edit</Button>
                              <Button color="red" onClick={()=>handleDelete(items)}>Delete</Button>
                              <Button color="yellow" onClick={()=>handlePublish(items)}>UnPublish</Button>
                            </div>
                          </div>
                        )
                      }
                    </div>
                  )
                  })
                }
              </ListGroup>
            </AccordionContent>
          </AccordionPanel>
        </Accordion>
      </div>
    </main>
  );
};

export default page;
