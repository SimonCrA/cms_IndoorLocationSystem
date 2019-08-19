    const RSSIprom = require('../calculos/configfile/configfile');
    
    var kalmanVariance = 8.184352498;
    var kalmanCovariance = 0.05;
    
    meshEvaluate[i].Q = kalmanCovariance;
    meshEvaluate[i].R = kalmanVariance;
    meshEvaluate[i].Xt_predictiva = 0.0; //xt~
    meshEvaluate[i].Xt_1 = -65.0; // x~1           
    meshEvaluate[i].Xt_s = -65.0; //xt^
    meshEvaluate[i].P_Covar_pre = 0.0; //pt~
    meshEvaluate[i].P_Covar_1 = 0.0; //pt~1   
    meshEvaluate[i].P_Covar_s = 0.0; //pt^
    meshEvaluate[i].kalmanT = 0.0; //kt^


    meshEvaluate[i].Xt_predictiva = meshEvaluate[i].Xt_1;
    meshEvaluate[i].P_Covar_pre = meshEvaluate[i].P_Covar_1 + meshEvaluate[i].Q;
    meshEvaluate[i].kalmanT = (meshEvaluate[i].P_Covar_pre) / (meshEvaluate[i].P_Covar_pre + meshEvaluate[i].R);
    meshEvaluate[i].Xt_s = meshEvaluate[i].Xt_predictiva + meshEvaluate[i].kalmanT * (meshEvaluate[i].rssi - meshEvaluate[i].Xt_predictiva);
    meshEvaluate[i].P_Covar_s = (1 - meshEvaluate[i].kalmanT) * meshEvaluate[i].P_Covar_pre;
    meshEvaluate[i].Xt_1 = meshEvaluate[i].Xt_s;
    meshEvaluate[i].P_Covar_1 = meshEvaluate[i].P_Covar_s;