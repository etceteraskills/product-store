import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { Box, Heading, IconButton, Button, Image, useColorModeValue, HStack, Text, VStack, Input } from "@chakra-ui/react";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from '@chakra-ui/react'
import { useDisclosure } from "@chakra-ui/react";
import React, { useState } from "react";

import { useProductStore } from "../store/product";
import { useToast } from "@chakra-ui/react";


const ProductCard = ({ product }) => {

    const textColor = useColorModeValue("gray.600", "gray.200");
    const bg = useColorModeValue("white", "gray.700");
    const toast = useToast();

    const { deleteProduct, updatedProduct} = useProductStore();
    const { isOpen, onOpen, onClose } = useDisclosure();


    const handleUpdateProduct = async (pid, updateProduct) => {
        const {success, message} = await updatedProduct(pid, updateProduct);
        if (success) {
            toast({
                title: "Product updated",
                description: message,
                status: "success",
                duration: 3000,
                isClosable: true,
            })
        }
        else {
            toast({
                title: "Product Not updated",
                description: message,
                status: "error",
                duration: 3000,
                isClosable: true,
            })
        }
        onClose();
    };

    const [updateProduct, setUpdateProduct] = useState(product);


    const handleDeleteProduct = async (pid) => {
        const { success, message } = await deleteProduct(pid);
        if (success) {
            toast({
                title: "Product deleted",
                description: message,
                status: "success",
                duration: 3000,
                isClosable: true,
            })
        }
        else {
            toast({
                title: "Product Not deleted",
                description: message,
                status: "error",
                duration: 3000,
                isClosable: true,
            })
        }
    }

    return (
        <Box shadow='lg'
            rounded='lg'
            overflow='hidden'
            transition='all 0.3s'
            _hover={{ transform: "translateY(-5px)", Shadow: 'xl' }}
            bg={bg}>


            <Image src={product.image} alt={product.name} h={48} w='full' objectFit='cover' />
            <Box p={4}>
                <Heading as='h3' size='md' mb={2}>
                    {product.name}
                </Heading>
                <Text fontWeight='bold' fontSize='xl' color={textColor} mb={4}>
                    ${product.price}
                </Text>

                <HStack spacing={2}>
                    <IconButton icon={<EditIcon />} onClick={onOpen} colorScheme='blue' />
                    <IconButton icon={<DeleteIcon />} onClick={() => handleDeleteProduct(product._id)} colorScheme='red' />
                </HStack>
            </Box>

            <Modal isOpen={isOpen} onClose={onClose}>

                <ModalOverlay />
                <ModalContent >
                    <ModalHeader>Update product</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <VStack spacing={4}>
                            <Input
                                placeholder='Product Name'
                                name="name"
                                value={updateProduct.name}
                                onChange={(e) => setUpdateProduct({ ...updateProduct, name: e.target.value })}
                            />
                            <Input
                                placeholder='Product Price'
                                name="price"
                                type="number"
                                value={updateProduct.price}
                                onChange={(e) => setUpdateProduct({ ...updateProduct, price: e.target.value })}
                            />
                            <Input
                                placeholder='Product Image URL'
                                name="image"
                                value={updateProduct.image}
                                onChange={(e) => setUpdateProduct({ ...updateProduct, image: e.target.value })} 
                            />
                        </VStack>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={() => { handleUpdateProduct(product._id, updateProduct) }}>
                            Update
                        </Button>
                        <Button variant='ghost' onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>

            </Modal>

        </Box>
    );
};

export default ProductCard;