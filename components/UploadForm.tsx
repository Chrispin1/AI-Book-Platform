"use client";

import { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Upload, Image, X } from "lucide-react";
import { FormLabel } from "@/components/ui/form-label";
import { FormControl } from "@/components/ui/form-control";
import LoadingOverlay from "@/components/LoadingOverlay";

const uploadSchema = z.object({
  pdfFile: z.instanceof(File).refine((file) => file.size <= 50 * 1024 * 1024, {
    message: "PDF file must be less than 50MB",
  }),
  coverImage: z.instanceof(File).optional(),
  title: z.string().min(1, "Title is required"),
  author: z.string().min(1, "Author name is required"),
  voice: z.string().min(1, "Please select a voice"),
});

type FormData = z.infer<typeof uploadSchema>;

const MALE_VOICES = [
  {
    id: "dave",
    name: "Dave",
    description: "Young male, British-Esp. casual & conversational",
  },
  {
    id: "daniel",
    name: "Daniel",
    description: "Middle-aged male, British, authoritative but warm",
  },
  { id: "chris", name: "Chris", description: "Male, casual & easy-going" },
];

const FEMALE_VOICES = [
  {
    id: "rachel",
    name: "Rachel",
    description: "Young female, American, calm & clear",
  },
  {
    id: "sarah",
    name: "Sarah",
    description: "Young female, American, soft & approachable",
  },
];

export default function UploadForm() {
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [selectedVoice, setSelectedVoice] = useState<string>("rachel");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(uploadSchema),
    defaultValues: {
      title: "",
      author: "",
      voice: "rachel",
    },
  });

  const onSubmit = useCallback(
    async (data: FormData) => {
      setIsSubmitting(true);
      try {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        console.log("Form submitted:", { ...data, pdfFile, coverImage });
      } finally {
        setIsSubmitting(false);
      }
    },
    [pdfFile, coverImage],
  );

  const handlePdfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setPdfFile(file);
  };

  const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setCoverImage(file);
  };

  const removePdf = () => {
    setPdfFile(null);
    const input = document.querySelector(
      'input[name="pdfFile"]',
    ) as HTMLInputElement | null;
    if (input) input.value = "";
  };

  const removeCover = () => {
    setCoverImage(null);
    const input = document.querySelector(
      'input[name="coverImage"]',
    ) as HTMLInputElement | null;
    if (input) input.value = "";
  };

  const isVoiceSelected = (voiceId: string) => selectedVoice === voiceId;
  const selectVoice = (voiceId: string) => setSelectedVoice(voiceId);

  return (
    <div className="new-book-wrapper space-y-8">
      {isSubmitting && <LoadingOverlay />}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Book PDF File */}
        <div className="space-y-2">
          <FormLabel className="form-label font-inter">Book PDF File</FormLabel>
          <div className="relative">
            <div
              className={`upload-dropzone ${pdfFile ? "upload-dropzone-uploaded" : ""}`}
              onClick={() => {
                if (pdfFile) return;
                const input = document.querySelector(
                  'input[name="pdfFile"]',
                ) as HTMLInputElement | null;
                input?.click();
              }}>
              {pdfFile ? (
                <>
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Upload className="upload-dropzone-icon" />
                    <span className="text-[#663820] font-medium">
                      {pdfFile.name}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      removePdf();
                    }}
                    className="upload-dropzone-remove">
                    <X className="w-6 h-6" />
                  </button>
                </>
              ) : (
                <>
                  <Upload className="upload-dropzone-icon" />
                  <div className="upload-dropzone-text font-inter">
                    Click to upload PDF
                  </div>
                  <div className="upload-dropzone-hint font-jost">
                    PDF file (max 50MB)
                  </div>
                </>
              )}
              <input
                type="file"
                name="pdfFile"
                accept="application/pdf"
                className="hidden"
                onChange={handlePdfChange}
              />
            </div>
            {errors.pdfFile && (
              <p className="text-xs text-red-500 mt-1">
                {errors.pdfFile.message}
              </p>
            )}
          </div>
        </div>
        {/* Cover Image (Optional) */}
        <div className="space-y-2">
          <FormLabel className="form-label font-inter">
            Cover Image (Optional)
          </FormLabel>
          <div className="relative">
            <div
              className={`upload-dropzone ${coverImage ? "upload-dropzone-uploaded" : ""}`}
              onClick={() => {
                if (coverImage) return;
                const input = document.querySelector(
                  'input[name="coverImage"]',
                ) as HTMLInputElement | null;
                input?.click();
              }}>
              {coverImage ? (
                <>
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Image className="upload-dropzone-icon" />
                    <span className="text-[#663820] font-medium">
                      {coverImage.name}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeCover();
                    }}
                    className="upload-dropzone-remove">
                    <X className="w-6 h-6" />
                  </button>
                </>
              ) : (
                <>
                  <Image className="upload-dropzone-icon" />
                  <div className="upload-dropzone-text font-inter">
                    Click to upload cover image
                  </div>
                  <div className="upload-dropzone-hint font-jost text-md">
                    Leave empty to auto-generate from PDF
                  </div>
                </>
              )}
              <input
                type="file"
                name="coverImage"
                accept="image/*"
                className="hidden"
                onChange={handleCoverChange}
              />
            </div>
          </div>
        </div>
        {/* Title */}
        <div className="space-y-2">
          <FormLabel className="form-label font-inter">Title</FormLabel>
          <FormControl>
            <input
              type="text"
              {...register("title")}
              className="form-input "
              placeholder="ex: Rich Dad Poor Dad"
            />
          </FormControl>
          {errors.title && (
            <p className="text-xs text-red-500 mt-1">{errors.title.message}</p>
          )}
        </div>
        {/* Author Name */}
        <div className="space-y-2">
          <FormLabel className="form-label font-inter">Author Name</FormLabel>
          <FormControl>
            <input
              type="text"
              {...register("author")}
              className="form-input"
              placeholder="ex: Robert Kiyosaki"
            />
          </FormControl>
          {errors.author && (
            <p className="text-xs text-red-500 mt-1">{errors.author.message}</p>
          )}
        </div>
        {/* Voice Selector */}
        <div className="space-y-4">
          <FormLabel className="form-label font-inter">
            Choose Assistant Voice
          </FormLabel>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-[#3d485e] mb-3 font-jost">
                Male Voices
              </h3>
              <div className="voice-selector-options">
                {MALE_VOICES.map((voice) => (
                  <div
                    key={voice.id}
                    className={`voice-selector-option ${
                      isVoiceSelected(voice.id)
                        ? "voice-selector-option-selected"
                        : "voice-selector-option-default"
                    }`}
                    onClick={() => selectVoice(voice.id)}
                    role="radio"
                    aria-checked={isVoiceSelected(voice.id)}
                    tabIndex={0}>
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <input
                          type="radio"
                          name="voice"
                          value={voice.id}
                          checked={isVoiceSelected(voice.id)}
                          onChange={() => selectVoice(voice.id)}
                          className="peer sr-only"
                        />
                        <div className="w-5 h-5 rounded-full border-2 border-[var(--border-subtle)] peer-checked:border-[#663820] peer-checked:bg-[#663820] flex items-center justify-center transition-all">
                          {isVoiceSelected(voice.id) && (
                            <div className="w-2 h-2 bg-white rounded-full" />
                          )}
                        </div>
                      </div>
                      <div>
                        <div className="text-md font-medium text-[#222c37] font-jost">
                          {voice.name}
                        </div>
                        <div className="text-sm text-[#3d485e] font-jost">
                          {voice.description}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-[#3d485e] mb-3">
                Female Voices
              </h3>
              <div className="voice-selector-options">
                {FEMALE_VOICES.map((voice) => (
                  <div
                    key={voice.id}
                    className={`voice-selector-option ${
                      isVoiceSelected(voice.id)
                        ? "voice-selector-option-selected"
                        : "voice-selector-option-default"
                    }`}
                    onClick={() => selectVoice(voice.id)}
                    role="radio"
                    aria-checked={isVoiceSelected(voice.id)}
                    tabIndex={0}>
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <input
                          type="radio"
                          name="voice"
                          value={voice.id}
                          checked={isVoiceSelected(voice.id)}
                          onChange={() => selectVoice(voice.id)}
                          className="peer sr-only"
                        />
                        <div className="w-5 h-5 rounded-full border-2 border-[var(--border-subtle)] peer-checked:border-[#663820] peer-checked:bg-[#663820] flex items-center justify-center transition-all">
                          {isVoiceSelected(voice.id) && (
                            <div className="w-2 h-2 bg-white rounded-full" />
                          )}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-[#222c37]">
                          {voice.name}
                        </div>
                        <div className="text-xs text-[#3d485e]">
                          {voice.description}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {errors.voice && (
            <p className="text-xs text-red-500 mt-1">{errors.voice.message}</p>
          )}
        </div>
        {/* Submit Button */}
        <button type="submit" className="form-btn" disabled={isSubmitting}>
          Begin Synthesis
        </button>
      </form>
    </div>
  );
}
