import axios from "axios";

export const getData= async()=>{
    let response=await axios.get("http://localhost:8080/HRC60451WK-back_end/ShowRecords");
    return response.data;
}

export const addCustomer= async ({business_code,cust_number,clear_date,business_year,document_id,
    posting_date,document_create_date,due_date,invoice_currency,document_type,posting_id,total_open_amount,
    baseline_create_date,cust_payment_terms,invoice_id})=>{
        let data="business_code="+business_code+"&cust_number="+cust_number+"&clear_date="+clear_date+"&business_year="
                +business_year+"&doc_id="+document_id+"&posting_date="+posting_date+"&document_create_date="+document_create_date+
                "&due_in_date="+due_date+"&invoice_currency="+invoice_currency+"&document_type="+document_type+"&posting_id="
                +posting_id+"&total_open_amount="+total_open_amount+"&baseline_create_date="+baseline_create_date+
                "&cust_payment_terms="+cust_payment_terms+"&invoice_id="+invoice_id;
        let response=await axios.post("http://localhost:8080/HRC60451WK-back_end/AddRecords?"+data);
        return response.data;
    }

export const updateCustomer= async({sl_no,invoice_currency,cust_payment_terms})=>{
    let data="sl=" +sl_no+ "&currency=" +invoice_currency+ "&payment_terms=" +cust_payment_terms;
    let response=await axios.post("http://localhost:8080/HRC60451WK-back_end/EditRecords?"+data);
    return response.data;
}

export const deleteCustomer= async(sl_no)=>{
    let data="id="+sl_no;
    let response=await axios.get("http://localhost:8080/HRC60451WK-back_end/DeleteRecords?"+data);
    return response.data;
}

export const searchCustomer= async(cust_no)=>{
    let data="search="+cust_no;
    let response=await axios.get("http://localhost:8080/HRC60451WK-back_end/SearchRecords?"+data);
    return response.data;
}

export const advSearchCustomer= async({cust_number,business_year,doc_id,invoice_id})=>{
    let data="doc_id="+doc_id+"&inv_id="+invoice_id+"&cust_no="+cust_number+"&buss_yr="+business_year;
    let response=await axios.post("http://localhost:8080/HRC60451WK-back_end/AdvanceSearchRecords?"+data);
    return response.data;
}

export const predictBucket=async(cust)=>{
    let response=await axios.post("http://127.0.0.1:5000/get_prediction",{data:cust});
    return response.data;
}

export const updatePredictBucket=async(doc_id,aging_bucket)=>{
    let data="doc_id="+doc_id+"&aging_bucket="+aging_bucket;
    let response=await axios.post("http://localhost:8080/HRC60451WK-back_end/PredictRecords?"+data);
    return response.data;
}

export const analyseCustomer= async({clear_date_start,clear_date_end,due_date_start,due_date_end,baseline_create_date_start,
    baseline_create_date_end,invoice_currency})=>{
let data="clear_s="+clear_date_start+"&clear_e="+clear_date_end+"&base_s="+baseline_create_date_start+
    "&base_e="+baseline_create_date_end+"&due_s="+due_date_start+"&due_e="+due_date_end+"&curr="+invoice_currency;
let response=await axios.post("http://localhost:8080/HRC60451WK-back_end/AnalyticsRecords?"+data);

return response.data;
}