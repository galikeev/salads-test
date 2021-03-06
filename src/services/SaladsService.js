import { useHttp } from "../hooks/http.hook";

const useSaladsService = () => {
    const {request, clearError, process, setProcess} = useHttp();

    const _apiBase = 'http://test-job.webatom.ru/';

    const getAllSalads = async () => {
        const res = await request(`${_apiBase}salads`);
        return res.result;
    }

    const getAllMolecules = async () => {
        const res = await request(`${_apiBase}molecules`);
        return res.result;
    }

    const getSalad = async (id) => {
        const res = await request(`${_apiBase}salad/${id}`);
        return res.result;
    }

    const getMolecule = async (id) => {
        const res = await request(`${_apiBase}molecule/${id}`);
        return res.result;
    }

    const postSalad = async (data) => {
        const res = await request('http://test-job.webatom.ru/order', 'POST', JSON.stringify({data}))
        console.log(res)
        return res;
    }

    return {
        clearError,
        process,
        setProcess,
        getAllSalads,
        getAllMolecules,
        getSalad,
        getMolecule,
        postSalad
    }
}

export default useSaladsService;