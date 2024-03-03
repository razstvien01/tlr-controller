"use client";

import { Button } from "../ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Loader } from "lucide-react";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import AlertSuccess from "../success-alert";
import AlertDestructive from "../alert-destructive";
import { Textarea } from "../ui/textarea";
import { ShowToast } from "../show-toast";
import { useUserDataAtom } from "../../hooks/user-data-atom";
import { Dialog } from "../ui/dialog";
import axios from "axios";
import React from "react";

interface DialogProps {
  showDialog: boolean;
  setShowDialog: Dispatch<SetStateAction<boolean>>;
  setSuccessAdd: Dispatch<SetStateAction<boolean>>;
}

export function AddRobotDialog({
  showDialog,
  setShowDialog,
  setSuccessAdd,
}: DialogProps) {
  const [userData, setUserData] = useUserDataAtom();
  const [isSave, setIsSave] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState({
    success: false,
    error: false,
  });

  const [message, setMessage] = useState("");
  const [toastParams, setToastParams] = useState<any>();
  const [showToast, setShowToast] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  useEffect(() => {
    if (hasSubmitted) {
      const timer = setTimeout(() => {
        setIsVisible({
          error: false,
          success: false,
        });
        setShowDialog(false);
        setShowToast(true);
        setIsSave(false);
        setSuccessAdd((prev) => !prev);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [
    isVisible.success,
    toastParams,
    hasSubmitted,
    setShowDialog,
    setSuccessAdd,
  ]);

  useEffect(() => {
    if (showToast) {
      ShowToast(toastParams);
      setShowToast(false);
      setHasSubmitted(false);
    }
  }, [showToast, toastParams]);

  const getActualImageUrl = async () => {
    try {
      // Axios follows redirects by default, so the resolved URL will be the final one after redirection.
      const response = await axios({
        method: "GET",
        url: "https://source.unsplash.com/random/?space,night,star,moon",
        maxRedirects: 5, // The default is 5, but it's set explicitly here for clarity
      });

      return response.request.responseURL; // This should give the final redirected URL
    } catch (error) {
      console.error("Error fetching the actual image URL:", error);
      return ""; // Return an empty string or handle the error as appropriate
    }
  };

  // Function to handle form submission with async image URL fetching.
  const handleSubmit = async () => {};

  return (
    <Dialog open={showDialog} onOpenChange={setShowDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Robot</DialogTitle>
          <DialogDescription>
            {
              "Add a new project to track bugs and issues for your organization's ongoing initiatives."
            }
          </DialogDescription>
        </DialogHeader>
        <div>
          <div className="space-y-4 py-2 pb-4">
            <div className="space-y-2">
              <Label>Project name</Label>
              <Input
                id="project_name"
                placeholder="Enter project name"
                // onChange={(e) => handleOnchangeData(e)}
              />
            </div>
            <div className="space-y-2">
              <Label>Project details</Label>
              <Textarea
                id="project_description"
                // onChange={(e) => handleOnchangeData(e)}
                placeholder="Type your project details here."
              />
            </div>
          </div>
        </div>
        {isVisible.success ? <AlertSuccess description={message} /> : null}
        {isVisible.error ? <AlertDestructive description={message} /> : null}
        <DialogFooter>
          <Button
            variant="outline"
            // onClick={() => setShowNewOrgDialog(false)}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            onClick={handleSubmit}
            disabled={isSave || isVisible.success}
          >
            {isSave ? <Loader className="mr-2 h-4 w-4 animate-spin" /> : null}
            {isSave ? "Saving" : "Save"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
