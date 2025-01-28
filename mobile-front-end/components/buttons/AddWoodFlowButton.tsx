"use client";

// React and NextJS
import { useState } from "react";
import { Button, Input, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Select, SelectItem } from "@heroui/react";
import { Factory, PackagePlus, UserRoundPlus } from "lucide-react";
import { Role } from "@/types/users";
import { Address } from "viem";
import { CutType, WoodType } from "@/types/woodFlows";

interface AddWoodFlowButtonParams {
    onSubmitCreateWoodFlow: Function;
}

export default function AddWoodFlowButton({ onSubmitCreateWoodFlow: createWoodFlow }: AddWoodFlowButtonParams) {
    const [isModalOpen, setModalOpen] = useState(false);

    const [weightInKg, setWeightInKg] = useState<number | null>();
    const [selectedWoodType, setSelectedWoodType] = useState<WoodType | null>();
    const [selectedCutType, setSelectedCutType] = useState<CutType | null>();

    const openModal = () => setModalOpen(true);

    const closeModal = () => {
        setModalOpen(false);
    };

    function handleSubmitWoodFlow() {
        try {
            createWoodFlow(weightInKg, selectedWoodType, selectedCutType);
            closeModal();
        } catch (error) {
            console.log('Error: ', error);
        }
    };

    return (
        <>
            <Button onPress={openModal} color="secondary">
                <PackagePlus size={17} color="#5b6069" />
            </Button>

            <Modal isOpen={isModalOpen} onClose={closeModal} backdrop="blur"
                placement="center">
                <ModalContent>
                    <ModalHeader>
                        <p>Create a wood flow</p>
                    </ModalHeader>

                    <ModalBody>
                        {/* <Select placeholder="Select a WoodFlow ID">
                            <SelectItem key={"1"}>WoodFlow #121</SelectItem>
                            <SelectItem key={"2"}>WoodFlow #122</SelectItem>
                            <SelectItem key={"3"}>WoodFlow #123</SelectItem>
                        </Select> */}
                        <Input value={"Dumoulin Bois"} type="text" label="Production site" disabled={true} style={{
                            color: "#6b7280",
                            backgroundColor: "transparent",
                        }} />
                        <Input value={"Paris, France"} type="text" label="Location" disabled={true} style={{
                            color: "#6b7280",
                            backgroundColor: "transparent",
                        }} />

                        <Input type="number" label="Weight (kg)" onChange={(e) => setWeightInKg(Number(e.target.value))} />

                        <Select
                            label="Wood Type"
                            onChange={(e) => setSelectedWoodType(Number(e.target.value) as WoodType)}
                        >
                            {Object.keys(WoodType)
                                .filter((key) => isNaN(Number(key)))
                                .map((woodType, index) => (
                                    <SelectItem key={index} value={index.toString()}>
                                        {woodType}
                                    </SelectItem>
                                ))}
                        </Select>

                        <Select
                            label="Cut Type"
                            onChange={(e) => setSelectedCutType(Number(e.target.value) as CutType)}
                        >
                            {Object.keys(CutType)
                                .filter((key) => isNaN(Number(key)))
                                .map((cutType, index) => (
                                    <SelectItem key={index} value={index.toString()}>
                                        {cutType}
                                    </SelectItem>
                                ))}
                        </Select>
                    </ModalBody>

                    <ModalFooter>
                        <Button onPress={closeModal} variant="light">
                            Cancel
                        </Button>
                        <Button onPress={handleSubmitWoodFlow} color={"primary"}>Create</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal >
        </>
    );
}
