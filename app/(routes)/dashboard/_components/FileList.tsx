import { FilesListContext } from "@/app/_context/FilesListContext";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { Archive, MoreHorizontal, Trash2 } from "lucide-react";
import moment from "moment";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useRouter } from "next/navigation";


export interface FILE {
  archive: boolean;
  document: string;
  createdBy: string;
  fileName: string;
  teamId: string;
  whiteboard: string;
  _id: string;
  creationTime: number;
}

function FileList() {
  const { fileList_, setFileList_ } = useContext(FilesListContext);
  const [fileList, setFileList] = useState<any>();
  const { user }: any = useKindeBrowserClient();
  const router = useRouter();

  useEffect(() => {
    fileList_ && setFileList(fileList_);
    console.log(fileList_);
  }, [fileList_]);

  return (
    <div className="mt-6">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
          <thead className="ltr:text-left rtl:text-right">
            <tr>
              <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Name
              </td>
              <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-700">
                Created
              </td>
              <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-700">
                Edited
              </td>
              <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-700">
                Author
              </td>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {fileList &&
              fileList.map((file: FILE, index: number) => (
                <tr className="odd:bg-gray-50 cursor-pointer"
                onClick={()=>router.push('/workspace/'+file._id)}>
                  <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    {file.fileName}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {moment(file.creationTime).format("DD MMM YYYY")}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {moment(file.creationTime).format("DD MMM YYYY")}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    <Image
                      src={user?.picture}
                      alt="user"
                      height={30}
                      width={30}
                      className="rounded-full"
                    />
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                  
                  <DropdownMenu>
  <DropdownMenuTrigger><MoreHorizontal /></DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem className="gap-2"><Archive className="h-4 w-4"/> Archive</DropdownMenuItem>
    <DropdownMenuItem className="gap-2"><Trash2 className="h-4 w-4"/> Delete</DropdownMenuItem>
    
  </DropdownMenuContent>
</DropdownMenu>

                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default FileList;
