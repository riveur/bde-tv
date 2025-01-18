import { router } from '@inertiajs/react'
import axios, { AxiosProgressEvent, CancelTokenSource } from 'axios'
import { LoaderIcon, UploadCloud } from 'lucide-react'
import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { toast } from 'sonner'

import { Input } from '@/components/ui/input'

interface FileUploadProgress {
  progress: number
  File: File
  source: CancelTokenSource | null
}

export function SlideUploader() {
  const [, setUploadedFiles] = useState<File[]>([])
  const [filesToUpload, setFilesToUpload] = useState<FileUploadProgress[]>([])

  // feel free to mode all these functions to separate utils
  // here is just for simplicity
  const onUploadProgress = (
    progressEvent: AxiosProgressEvent,
    file: File,
    cancelSource: CancelTokenSource
  ) => {
    const progress = Math.round((progressEvent.loaded / (progressEvent.total ?? 0)) * 100)

    if (progress === 100) {
      setUploadedFiles((prevUploadedFiles) => {
        return [...prevUploadedFiles, file]
      })

      setFilesToUpload((prevUploadProgress) => {
        return prevUploadProgress.filter((item) => item.File !== file)
      })

      return
    }

    setFilesToUpload((prevUploadProgress) => {
      return prevUploadProgress.map((item) => {
        if (item.File.name === file.name) {
          return {
            ...item,
            progress,
            source: cancelSource,
          }
        } else {
          return item
        }
      })
    })
  }

  const uploadImage = async (
    formData: FormData,
    // eslint-disable-next-line @typescript-eslint/no-shadow
    onUploadProgress: (progressEvent: AxiosProgressEvent) => void,
    cancelSource: CancelTokenSource
  ) => {
    return axios.post(`/slides/upload`, formData, {
      onUploadProgress,
      cancelToken: cancelSource.token,
    })
  }

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    setFilesToUpload((prevUploadProgress) => {
      return [
        ...prevUploadProgress,
        ...acceptedFiles.map((file) => {
          return {
            progress: 0,
            File: file,
            source: null,
          }
        }),
      ]
    })

    const fileUploadBatch = acceptedFiles.map((file) => {
      const formData = new FormData()
      formData.append('file', file)

      const cancelSource = axios.CancelToken.source()
      return uploadImage(
        formData,
        (progressEvent) => onUploadProgress(progressEvent, file, cancelSource),
        cancelSource
      )
    })

    try {
      await Promise.all(fileUploadBatch)
      router.reload({
        onSuccess() {
          toast.success('Slide enregistré avec succès')
        },
      })
    } catch (error: unknown) {
      toast.error("Erreur lors de l'envoi des fichiers")
      console.error('Error uploading files: ', error)
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  return (
    <div className="group" data-drag={isDragActive}>
      <label
        {...getRootProps()}
        className="relative flex flex-col items-center justify-center h-32 border-2 border-dashed group-data-[drag=true]:border-solid rounded-lg cursor-pointer hover:bg-muted/80 hover:border-transparent"
      >
        {filesToUpload.length === 0 ? (
          <UploadCloud className="h-8 w-8 text-gray-300" />
        ) : (
          <LoaderIcon className="animate-spin" />
        )}
      </label>

      <Input
        {...getInputProps()}
        id="dropzone-file"
        accept="image/png, image/jpeg"
        type="file"
        className="hidden"
      />
    </div>
  )
}
