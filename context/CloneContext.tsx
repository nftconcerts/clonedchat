"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface CloneInfo {
  name: string;
  image: string;
  description: string;
  cloneStep: number;
  emotions: {
    happiness: number;
    sadness: number;
    anger: number;
    surprise: number;
    fear: number;
    disgust: number;
  };
  cloneid: string;
}

interface CloneContextType extends CloneInfo {
  setName: (name: string) => void;
  setImage: (image: string) => void;
  setDescription: (description: string) => void;
  setCloneStep: (cloneStep: number) => void;
  setEmotion: (emotion: keyof CloneInfo["emotions"], value: number) => void;
  setCloneId: (cloneid: string) => void;
}

const CloneContext = createContext<CloneContextType | undefined>(undefined);

interface CloneProviderProps {
  children?: ReactNode; // Using `?` to indicate that children are optional
}

// If you prefer not to use React.FC, you can directly type the function parameters like so:
export const CloneProvider = ({ children }: CloneProviderProps) => {
  const [cloneInfo, setCloneInfo] = useState<CloneInfo>({
    name: "",
    image: "",
    description: "",
    cloneStep: 0,
    emotions: {
      happiness: 0,
      sadness: 0,
      anger: 0,
      surprise: 0,
      fear: 0,
      disgust: 0,
    },
    cloneid: "",
  });

  const setName = (name: string) => setCloneInfo({ ...cloneInfo, name });
  const setImage = (image: string) => setCloneInfo({ ...cloneInfo, image });
  const setDescription = (description: string) =>
    setCloneInfo({ ...cloneInfo, description });
  const setCloneStep = (cloneStep: number) =>
    setCloneInfo({ ...cloneInfo, cloneStep });
  const setEmotion = (emotion: keyof CloneInfo["emotions"], value: number) =>
    setCloneInfo({
      ...cloneInfo,
      emotions: { ...cloneInfo.emotions, [emotion]: value },
    });
  const setCloneId = (cloneid: string) =>
    setCloneInfo({ ...cloneInfo, cloneid });
  return (
    <CloneContext.Provider
      value={{
        ...cloneInfo,
        setName,
        setImage,
        setDescription,
        setCloneStep,
        setEmotion,
        setCloneId,
      }}
    >
      {children}
    </CloneContext.Provider>
  );
};

export const useCloneContext = () => {
  const context = useContext(CloneContext);
  if (context === undefined) {
    throw new Error("useCloneContext must be used within a CloneProvider");
  }
  return context;
};
