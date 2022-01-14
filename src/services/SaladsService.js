import { useHttp } from "../hooks/http.hook";

const useSaladsService = () => {
    const {request, clearError, process, setProcess} = useHttp();

    const _apiBase = 'http://test-job.webatom.ru/';

    const getAllMolecules = async () => {
        const res = await request(`${_apiBase}molecules`);
        return res.result;
    }

    return {
        clearError,
        process,
        setProcess,
        getAllMolecules
    }
}

export default useSaladsService;