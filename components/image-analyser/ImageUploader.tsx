"use client";
import { useCallback, useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDropzone } from "react-dropzone";
import { z } from "zod";
import { toast } from "sonner";
import { Loader2, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useImageAnalysis } from "@/app/context/imageAnalysisContext";

const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};

export const ImageUploader = () => {
  const [preview, setPreview] = useState<string | ArrayBuffer | null>("");
  const [base64Image, setBase64Image] = useState<string | null>(null);
  const { setImageAnalysis } = useImageAnalysis();

  const formSchema = z.object({
    image: z
      .instanceof(File, { message: "Please upload an image" })
      .refine((file) => file.size > 0),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      image: undefined,
    },
  });

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];

      try {
        const base64 = await fileToBase64(file);
        setPreview(base64);
        setBase64Image(base64);
        form.setValue("image", file);
        form.clearErrors("image");
      } catch (error) {
        console.log(error);
        setPreview(null);
        setBase64Image(null);
        form.resetField("image");
      }
    },
    [form]
  );

  const analyzeImage = async (base64: string) => {
    try {
      const response = await fetch("/api/image-analyser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: base64 }),
      });
      if (!response.ok) {
        throw new Error(`Failed to process voice data: ${response.status}`);
      }
      const data = await response.json();
      setImageAnalysis(data);
    } catch (error) {
      console.log(error);
      toast.error("Failed to analyze image");
    }
  };

  const { getRootProps, getInputProps, fileRejections } = useDropzone({
    onDrop,
    maxFiles: 1,
    maxSize: 1000000,
    accept: {
      "image/png": [],
      "image/jpg": [],
      "image/jpeg": [],
      "image/webp": [],
    },
  });

  const onSubmit = async () => {
    if (base64Image) {
      await analyzeImage(base64Image);
    }
  };

  const removeImage = () => {
    setPreview(null);
    setBase64Image(null);
    form.resetField("image");
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-x-4 md:space-y-4 md:border-r"
      >
        <FormField
          control={form.control}
          name="image"
          render={() => (
            <FormItem>
              <FormControl>
                <div
                  {...getRootProps()}
                  className="relative mx-auto min-h-[400px] min-w-[90%] flex flex-col items-center justify-center gap-y-2 rounded-md p-8 border-3 border-dotted bg-[#f9fafc]"
                >
                  {!preview && (
                    <FormLabel className="flex flex-col items-center justify-center gap-y-2">
                      <p className="text-gray-600">
                        Drag and drop wound image here
                      </p>
                      <span className="text-gray-600">or</span>
                      <Button asChild>
                        <label
                          htmlFor="file-input"
                          className="cursor-pointer text-lg px-6 py-6"
                        >
                          Browse Files
                        </label>
                      </Button>
                    </FormLabel>
                  )}
                  {preview ? (
                    <div>
                      <Image
                        src={preview as string}
                        alt="Uploaded image"
                        className="rounded-lg max-h-96"
                        width={400}
                        height={400}
                        unoptimized
                      />
                      <button
                        type="button"
                        className="absolute top-0 right-0 p-2 rounded-full cursor-pointer"
                        onClick={removeImage}
                      >
                        <X size={20} />
                      </button>
                    </div>
                  ) : (
                    <Input {...getInputProps()} type="file" />
                  )}
                </div>
              </FormControl>
              <FormMessage>
                {fileRejections.length !== 0 && (
                  <p>
                    Image must be less than 1MB and of type png, jpg, webp, or
                    jpeg
                  </p>
                )}
              </FormMessage>
            </FormItem>
          )}
        />
        <Button
          type="submit"
          disabled={form.formState.isSubmitting}
          className="mt-2 mx-auto flex gap-2 h-auto rounded-lg px-8 py-3 disabled:cursor-auto cursor-pointer"
        >
          {form.formState.isSubmitting && (
            <Loader2 className="animate-spin w-6 h-6" />
          )}
          <span>Analyse</span>
        </Button>
      </form>
    </Form>
  );
};
