import * as React from "react";
import FormContainer from "../FormContainer/FormContainer";
import { UrlData } from "../../interface/UrlData";
import axios from "axios";
import { serverUrl } from "../../helpers/Constants";
import DataTable from "../DataTable/DataTable";
import { useToast } from "../../context/ToastContext";

interface IContainerProps {}

const Container: React.FunctionComponent<IContainerProps> = () => {
  const [data, setData] = React.useState<UrlData[]>([]);
  const [reload, setReload] = React.useState<boolean>(false);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const { showError } = useToast();

  const updateReloadState = (): void => {
    setReload(true);
  };

  const fetchTableData = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${serverUrl}/shortUrl`);
      // Handle the API response structure properly
      if (response.data && response.data.data) {
        setData(response.data.data);
      } else if (Array.isArray(response.data)) {
        setData(response.data);
      } else {
        setData([]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setData([]);
      showError("Failed to load URLs. Please refresh the page.");
    } finally {
      setIsLoading(false);
      setReload(false);
    }
  };

  React.useEffect(() => {
    fetchTableData();
  }, [reload]);

  return (
    <div className="min-h-screen">
      <FormContainer updateReloadState={updateReloadState} />
      {isLoading ? (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex justify-center items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        </div>
      ) : (
        <DataTable updateReloadState={updateReloadState} data={data} />
      )}
    </div>
  );
};

export default Container;
