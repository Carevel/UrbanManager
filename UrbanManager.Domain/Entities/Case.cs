using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UrbanManager.Domain.Entities
{
    public class Case
    {
        public string TaskId { get; set; }
        public string CaseSn { get; set; }
        public string InfoSource { get; set; }
        public string InfoTypeID { get; set; }
        public string InfoType { get; set; }
        public string BigClass { get; set; }
        public string SmallClass { get; set; }
        public string BigClassName { get; set; }
        public string SmallClassName { get; set; }
        public string SonClass { get; set; }
        public string SonClassName { get; set; }
        public DateTime DiscoverTime { get; set; }
        public string PreCreateTime { get; set; }
        public string CreateTime { get; set; }
        public string DiapatchTime { get; set; }
        public string AllMiddleTime { get; set; }
        public string AllImportantTime { get; set; }
        public string MiddleSolvingTime { get; set; }
        public string ImportantSolvingTime { get; set; }
        public string Description { get; set; }
        public string Address { get; set; }
        public string ReportImages { get; set; }
        public string ReportSounds { get; set; }
        public string Status { get; set; }
        public string DeptCode { get; set; }
        public string LastAllEndtime { get; set; }
        public string ImageFileName { get; set; }
        public string WavFileName { get; set; }
        public string CheckImage { get; set; }
        public string CheckWav { get; set; }
        public string Reporter { get; set; }
        public string ContactInfo { get; set; }
        public string ExecuteDeptCode { get; set; }
        public string ExecuteDeptName { get; set; }
        public string FirstHandDeptCode { get; set; }
        public string IsDelay { get; set; }
        public string PartSN { get; set; }
        public string StreetCode { get; set; }
        public string StreetName { get; set; }
        public string CommunityCode { get; set; }
        public string CommunityName { get; set; }
        public string GridCode { get; set; }
        public string KeeperSN { get; set; }
        public string KeeperMobile { get; set; }
        public string KeeperName { get; set; }
        public string CoordX { get; set; }
        public string CoordY { get; set; }
        public string PartState { get; set; }
        public bool HasChecked { get; set; }
        public string DeptName { get; set; }
        public string AlarmLight { get; set; }
        public string AlarmLightTip { get; set; }
        public string TotalAlarmLight { get; set; }
        public string TotalAlarmLightTip { get; set; }
        public string InfoSourceID { get; set; }
        public string InfoSourceNote { get; set; }
        public string SimilarCaseSN { get; set; }
        public string Street { get; set; }
        public string CaseEnd { get; set; }
        public string EndTime { get; set; }
        public string ISCallBack { get; set; }
        public string IsFeedBack { get; set; }
        public string HeChaCount { get; set; }
        public string IsWeiXian { get; set; }
        public string IsHasMsg { get; set; }
        public string LastExecuteDeptCode { get; set; }
        public string LastExecuteDeptName { get; set; }
        public string WorkGridCode { get; set; }
        public string DeptBackCheckPass { get; set; }
        public string IsStubborn { get; set; }
        public string IsTypical { get; set; }
        public string UpdateTime { get; set; }
        public string IsDelayStreet { get; set; }
        public string IsFast { get; set; }
        public string IsPriorityArea { get; set; }
        public string PriorityArea { get; set; }
        public string Approach { get; set; }
        public string UrgentDegree { get; set; }
        public string ServiceType { get; set; }
        public string InfoAtCode { get; set; }
        public string InfoAtName { get; set; }
        public string HotlineSN { get; set; }
        public string LimitTime { get; set; }
        public string IsBackAuthority { get; set; }
        public string AstepTime { get; set; }
        public string InsertUserName { get; set; }
        public string InsertUser { get; set; }
        public string CallNumber { get; set; }
        public string ReportSource { get; set; }
        public string ReportDept { get; set; }
        public string ReportIndustry { get; set; }
        public string IsHuiFang { get; set; }
        public string IsAnonymity { get; set; }
        public string ReportSourceName { get; set; }
        public string ReportDeptName { get; set; }
        public string ReportIndustryName { get; set; }
        public string ServicetypeName { get; set; }
        public string CaseValuation { get; set; }
        public string IsThreatened { get; set; }
        public string SpecialSign { get; set; }
        public string HotPoint { get; set; }
        public string IsRework { get; set; }
        public string ContactAddress { get; set; }
        public string NewStreetCode { get; set; }
        public string NewWorkGridCode { get; set; }
        public string NewGridCode { get; set; }
        public string IsCheckResult { get; set; }
        public string IsHotLine { get; set; }
        public string AssignFlag { get; set; }
    }
}
