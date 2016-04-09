<?xml version="1.0" encoding="UTF-8" ?>
<!--
	案件通用列表操作按钮控制
	created by guozhijian 2007/09/15
-->
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:template name="tplOperationButton">
    <xsl:variable name="taskId" select="taskId"/>
    <xsl:variable name="mainStatus" select="mainStatus"/>
    <xsl:variable name="categoryId" select="/taskCollection/@categoryId"/>
    <xsl:variable name="page" select="/taskCollection/@page"/>
    <xsl:variable name="solvingId" select="solvingId"/>
    <xsl:variable name="isDelay" select="isDelay"/>
    <xsl:variable name="deptTag" select="deptTag"/>
    <xsl:variable name="isCreatedByMyDept" select="isCreatedByMyDept"/>
    <xsl:variable name="returnUrl">
      <xsl:choose>
        <xsl:when test="$categoryId='10A'">MidVerifyHuanban.aspx?categoryId=<xsl:value-of select="$categoryId"/>
        </xsl:when>
        <xsl:when test="$categoryId='11A'">VerifyYanqi.aspx?categoryId=<xsl:value-of select="$categoryId"/>
        </xsl:when>
        <xsl:when test="$categoryId='9A'">SuperviseQuery.aspx?categoryId=<xsl:value-of select="$categoryId"/>
        </xsl:when>
        <xsl:when test="$categoryId='20'">SolvingQuery.aspx?categoryId=<xsl:value-of select="$categoryId"/>
        </xsl:when>
        <xsl:otherwise>TaskInfoList.aspx?categoryId=<xsl:value-of select="$categoryId"/>
        </xsl:otherwise>
      </xsl:choose>
    </xsl:variable>
    <div class="div_a" style="margin-top: -53px">
      <ul>
        <li>
          <span id="{taskId}_btn">操作</span>
          <div class="div_a1">
            <ul id="{taskId}_ul" >
              <xsl:choose>
                <!--受理、待上报核实-->
                <xsl:when test="$categoryId='0' or $categoryId='0S' ">
                  <!--受理-->
                  <xsl:if test="$categoryId='0'">
                    <li>
                      <a id="{$taskId}_btn006" onclick="TaskLock.Lock('{$taskId}','{$mainStatus}','../caseoperate_flat/../caseoperate_flat/ShouLi/PreCreateCase.aspx?TaskId={$taskId}&amp;categoryId={$categoryId}&amp;page={$page}&amp;returnUrl={$returnUrl}')" >
                        <span>受理</span>
                      </a>
                    </li>
                  </xsl:if>
                  <!--简易受理-->
                  <xsl:if test="$categoryId='0S'">
                    <li>
                      <a id="{$taskId}_btn010" onclick="TaskLock.Lock('{$taskId}','{$mainStatus}','../caseoperate_flat/JianYi/AutoPreCreateCase.aspx?TaskId={$taskId}&amp;categoryId={$categoryId}&amp;page={$page}&amp;returnUrl={$returnUrl}')" >
                        <span>受理</span>
                      </a>
                    </li>
                  </xsl:if>
                  <!--核实-->
                  <xsl:if test="heshiAuthorized='1'">
                    <li>
                      <a id="{$taskId}_btn005" onclick="TaskLock.Lock('{$taskId}','{$mainStatus}','../caseoperate_flat/HeShi/SendHeshiToPda.aspx?TaskId={$taskId}&amp;categoryId={$categoryId}&amp;page={$page}&amp;returnUrl={$returnUrl}')">
                        <span>下发核实</span>
                      </a>
                    </li>
                  </xsl:if>

                  <!--归档-->
                  <xsl:if test="(HotLinkSN='' or IsNotHotLineSN='1' ) and $isCreatedByMyDept='1' and $categoryId!='4'">
                    <li>
                      <a id="{$taskId}_btn004" onclick="TaskLock.Lock('{$taskId}','{$mainStatus}','../caseoperate_flat/ZuoFei/CancelCase.aspx?TaskId={$taskId}&amp;categoryId={$categoryId}&amp;page={$page}&amp;returnUrl={$returnUrl}')">
                        <span>归档</span>
                      </a>
                    </li>
                  </xsl:if>
                  <!--退回收集-->
                  <xsl:if test="InfoSourceid!='15' and InfoSourceid!='1' and InfoSourceid!='22' and InfoSourceid!='2' and InfoSourceid!='10'  and InfoSourceid!='68' and InfoSourceid!='99' and $isCreatedByMyDept='1' and $categoryId!='4'">
                    <li>
                      <a id="{$taskId}_btn008" onclick="TaskLock.Lock('{$taskId}','{$mainStatus}','../caseoperate_flat/TuiDan/BackCasetoCollect.aspx?TaskId={$taskId}&amp;categoryId={$categoryId}&amp;page={$page}&amp;returnUrl={$returnUrl}')">
                        <span>退回收集</span>
                      </a>
                    </li>
                  </xsl:if>
                  <!--退回外系统-->
                  <xsl:if test="HotLinkSN!='' and  IsCallBack!='Y' and  (InfoSourceid='2' or InfoSourceid='68') and IsNotHotLineSN='0' and $isCreatedByMyDept='1' and $categoryId!='4'">
                    <li>
                      <a id="{$taskId}_btn009" onclick="TaskLock.Lock('{$taskId}','{$mainStatus}','../caseoperate_flat/TuiDan/BackCaseto12319.aspx?TaskId={$taskId}&amp;categoryId={$categoryId}&amp;page={$page}&amp;returnUrl={$returnUrl}')">
                        <span>退回市级</span>
                      </a>
                    </li>
                  </xsl:if>
                  <xsl:if test="HotLock='0'">
                    <xsl:if test="DeptCode='101' and HotLinkSN!='' and   InfoSourceid='10'   and IsNotHotLineSN='0' and $isCreatedByMyDept='1' and $categoryId!='4' and AssignFlag='0'">
                      <li>
                        <a id="{$taskId}_btn016" onclick="TaskLock.Lock('{$taskId}','{$mainStatus}','../caseoperate_flat/ChuLi/RejectCase.aspx?TaskId={$taskId}&amp;categoryId={$categoryId}&amp;solvingId={$solvingId}&amp;page={$page}&amp;returnUrl={$returnUrl}')">
                          <span>申请退单</span>
                        </a>
                      </li>
                    </xsl:if>
                  </xsl:if>
                  <xsl:if test="HotLock='1'">
                    <xsl:if test="DeptCode='101' and HotLinkSN!='' and  InfoSourceid='10'   and IsNotHotLineSN='0' and $isCreatedByMyDept='1' and $categoryId!='4'">
                      <li>
                        <a id="{$taskId}_btn016" onclick="TaskLock.Lock('{$taskId}','{$mainStatus}','../caseoperate_flat/ChuLi/RejectCase.aspx?TaskId={$taskId}&amp;categoryId={$categoryId}&amp;solvingId={$solvingId}&amp;page={$page}&amp;returnUrl={$returnUrl}')">
                          <span>申请退单</span>
                        </a>
                      </li>
                    </xsl:if>
                  </xsl:if>
                </xsl:when>

                <xsl:when test="$categoryId='4'">
                  <!--核实-->
                  <xsl:if test="heshiAuthorized='1'">
                    <li>
                      <a id="{$taskId}_btn005" onclick="TaskLock.Lock('{$taskId}','{$mainStatus}','../caseoperate_flat/HeShi/SendHeshiToPda.aspx?TaskId={$taskId}&amp;categoryId={$categoryId}&amp;page={$page}&amp;returnUrl={$returnUrl}')">
                        <span>下发核实</span>
                      </a>
                    </li>
                  </xsl:if>
                  <xsl:if test="PlatformType='0'">
                    <xsl:if test="mainStatus='0'">
                      <li>
                        <a id="{$taskId}_btn006" onclick="TaskLock.Lock('{$taskId}','{$mainStatus}','../caseoperate_flat/ShouLi/PreCreateCase.aspx?TaskId={$taskId}&amp;categoryId={$categoryId}&amp;page={$page}&amp;returnUrl={$returnUrl}')" >
                          <span>受理</span>
                        </a>
                      </li>
                    </xsl:if>
                    <xsl:if test="mainStatus='3'">
                      <li>
                        <a id="{$taskId}_btn012" onclick="TaskLock.Lock('{$taskId}','{$mainStatus}','../caseoperate_flat/LiAn/CreateCase.aspx?TaskId={$taskId}&amp;categoryId={$categoryId}&amp;page={$page}&amp;returnUrl={$returnUrl}')" >
                          <span>立案</span>
                        </a>
                      </li>

                    </xsl:if>
                  </xsl:if>
                  <xsl:if test="PlatformType='1'">
                    <li>
                      <a id="{$taskId}_btn010" onclick="TaskLock.Lock('{$taskId}','{$mainStatus}','../caseoperate_flat/JianYi/AutoPreCreateCase.aspx?TaskId={$taskId}&amp;categoryId={$categoryId}&amp;page={$page}&amp;returnUrl={$returnUrl}')" >
                        <span>受理</span>
                      </a>
                    </li>
                  </xsl:if>
                  <li>
                    <a id="{$taskId}_btn004" onclick="TaskLock.Lock('{$taskId}','{$mainStatus}','../caseoperate_flat/ZuoFei/CancelCase.aspx?TaskId={$taskId}&amp;categoryId={$categoryId}&amp;page={$page}&amp;returnUrl={$returnUrl}')">
                      <span>归档</span>
                    </a>
                  </li>
                </xsl:when>
                <!--待核实-->
                <xsl:when test="$categoryId='4S'">
                  <li>
                    <a id="{$taskId}_btn011" onclick="TaskLock.Lock('{$taskId}','{$mainStatus}','../caseoperate_flat/HeShi/HeshiCase.aspx?TaskId={$taskId}&amp;categoryId={$categoryId}&amp;page={$page}&amp;returnUrl={$returnUrl}')">
                      <span>核实</span>
                    </a>
                  </li>
                </xsl:when>
                <!--收集、退回列表-->
                <xsl:when test="$categoryId='3' or $categoryId='2'">

                  <xsl:if test="InfoSourceid='37'">
                    <li>
                      <a id="{$taskId}_btn001" onclick="TaskLock.Lock('{$taskId}','{$mainStatus}','../caseoperate_flat/XinZeng/PublicReportSQUpdate.aspx?TaskId={$taskId}&amp;categoryId={$categoryId}&amp;page={$page}&amp;returnUrl={$returnUrl}')">
                        <span>再提交</span>
                      </a>
                    </li>
                  </xsl:if>
                  <xsl:if test="InfoSourceid!='37'">
                    <div style="margin-bottom:3px;">
                      <img  id="{$taskId}_btn002" src="../Images/new_resubmit.gif" onclick="TaskLock.Lock('{$taskId}','{$mainStatus}','XinZeng/PublicReportUpdate.aspx?TaskId={$taskId}&amp;categoryId={$categoryId}&amp;page={$page}&amp;returnUrl={$returnUrl}')" alt="再提交" border="0" style="cursor:hand;"/>
                    </div>
                  </xsl:if>

                  <li>
                    <a id="{$taskId}_btn002" onclick="TaskLock.Lock('{$taskId}','{$mainStatus}','../caseoperate_flat/XinZeng/PublicReportUpdate.aspx?TaskId={$taskId}&amp;categoryId={$categoryId}&amp;page={$page}&amp;returnUrl={$returnUrl}')">
                      <span>再提交</span>
                      <!--PublicReportUpdate-->
                    </a>
                  </li>
                </xsl:when>
                <!--立案-->
                <xsl:when test="$categoryId='6'">
                  <li>
                    <a id="{$taskId}_btn012" onclick="TaskLock.Lock('{$taskId}','{$mainStatus}','../caseoperate_flat/LiAn/CreateCase.aspx?TaskId={$taskId}&amp;categoryId={$categoryId}&amp;page={$page}&amp;returnUrl={$returnUrl}')" >
                      <span>立案</span>
                    </a>
                  </li>
                  <xsl:if test="heshiAuthorized='1'">
                    <li>
                      <a id="{$taskId}_btn005" onclick="TaskLock.Lock('{$taskId}','{$mainStatus}','../caseoperate_flat/HeShi/SendHeshiToPda.aspx?TaskId={$taskId}&amp;categoryId={$categoryId}&amp;page={$page}&amp;returnUrl={$returnUrl}')">
                        <span>下发核实</span>
                      </a>
                    </li>
                  </xsl:if>
                  <li>
                    <a id="{$taskId}_btn013" onclick="TaskLock.Lock('{$taskId}','{$mainStatus}','../caseoperate_flat/TuiDan/BackCasetoPreCreate.aspx?TaskId={$taskId}&amp;categoryId={$categoryId}&amp;page={$page}&amp;returnUrl={$returnUrl}')">
                      <span>回退受理</span>
                    </a>
                  </li>
                  <li>
                    <a id="{$taskId}_btn004" onclick="TaskLock.Lock('{$taskId}','{$mainStatus}','../caseoperate_flat/ZuoFei/CancelCase.aspx?TaskId={$taskId}&amp;categoryId={$categoryId}&amp;page={$page}&amp;returnUrl={$returnUrl}')">
                      <span>归档</span>
                    </a>
                  </li>
                </xsl:when>
                <!--派遣-->
                <xsl:when test="$categoryId='7' or $categoryId='7B'">

                  <li>
                    <a id="{$taskId}_btn014" onclick="TaskLock.Lock('{$taskId}','{$mainStatus}','../caseoperate_flat/Dispatch/DispatchCase.aspx?TaskId={$taskId}&amp;categoryId={$categoryId}&amp;solvingId={$solvingId}&amp;page={$page}&amp;returnUrl={$returnUrl}')">
                      <span>派遣</span>
                    </a>
                  </li>

                  <xsl:if test="isDisDeptType='-1'">
                    <li>
                      <a id="{$taskId}_btn015" onclick="TaskLock.Lock('{$taskId}','{$mainStatus}','../caseoperate_flat/TuiDan/BackCasetoCreate.aspx?TaskId={$taskId}&amp;categoryId={$categoryId}&amp;solvingId={$solvingId}&amp;page={$page}&amp;returnUrl={$returnUrl}')">
                        <span>回退立案</span>
                      </a>
                    </li>
                  </xsl:if>
                  <xsl:if test="isDisDeptType!='-1' and IsBackAuthority!='1' ">
                    <li>
                      <a id="{$taskId}_btn016" onclick="TaskLock.Lock('{$taskId}','{$mainStatus}','../caseoperate_flat/ChuLi/RejectCase.aspx?TaskId={$taskId}&amp;categoryId={$categoryId}&amp;solvingId={$solvingId}&amp;page={$page}&amp;returnUrl={$returnUrl}')">
                        <span>退单</span>
                      </a>
                    </li>
                  </xsl:if>
                </xsl:when>
                <!--再派遣-->
                <xsl:when test="$categoryId='7A'">
                  <li>
                    <a id="{$taskId}_btn021" onclick="TaskLock.Lock('{$taskId}','{$mainStatus}','../caseoperate_flat/Dispatch/DispatchCase.aspx?TaskId={$taskId}&amp;categoryId={$categoryId}&amp;solvingId={$solvingId}&amp;page={$page}&amp;returnUrl={$returnUrl}')">
                      <span>再派遣</span>
                    </a>
                  </li>
                  <xsl:if test="PlatformType='0'">
                    <xsl:if test="ExecuteDeptname!=''">
                      <li>
                        <a id="{$taskId}_btn029" onclick="TaskLock.Lock('{$taskId}','{$mainStatus}','../caseoperate_flat/DuBan/SuperviseCase.aspx?TaskId={$taskId}&amp;categoryId={$categoryId}&amp;solvingId={$solvingId}&amp;page={$page}&amp;returnUrl={$returnUrl}')">
                          <span>申请结案</span>
                        </a>
                      </li>
                    </xsl:if>
                    <!--退回外系统-->
                    <xsl:if test="HotLinkSN!='' and  IsCallBack!='Y' and  (InfoSourceid='2' or InfoSourceid='68')  and IsNotHotLineSN='0' and $isCreatedByMyDept='1' and $categoryId!='4'">
                      <li>
                        <a id="{$taskId}_btn009" onclick="TaskLock.Lock('{$taskId}','{$mainStatus}','../caseoperate_flat/TuiDan/BackCaseto12319.aspx?TaskId={$taskId}&amp;categoryId={$categoryId}&amp;page={$page}&amp;returnUrl={$returnUrl}')">
                          <span>退回市级</span>
                        </a>
                      </li>
                    </xsl:if>
                    <!--退回外系统-->
                    <xsl:if test="HotLock='0'">
                      <xsl:if test="DeptCode='101' and HotLinkSN!='' and  InfoSourceid='10'   and IsNotHotLineSN='0' and $isCreatedByMyDept='1' and $categoryId!='4' and AssignFlag='0'">
                        <li>
                          <a id="{$taskId}_btn016" onclick="TaskLock.Lock('{$taskId}','{$mainStatus}','../caseoperate_flat/ChuLi/RejectCase.aspx?TaskId={$taskId}&amp;categoryId={$categoryId}&amp;solvingId={$solvingId}&amp;page={$page}&amp;returnUrl={$returnUrl}')">
                            <span>申请退单</span>
                          </a>
                        </li>
                      </xsl:if>
                    </xsl:if>
                    <xsl:if test="HotLock='1'">
                      <xsl:if test="DeptCode='101' and HotLinkSN!='' and  InfoSourceid='10'   and IsNotHotLineSN='0' and $isCreatedByMyDept='1' and $categoryId!='4'">
                        <li>
                          <a id="{$taskId}_btn016" onclick="TaskLock.Lock('{$taskId}','{$mainStatus}','../caseoperate_flat/ChuLi/RejectCase.aspx?TaskId={$taskId}&amp;categoryId={$categoryId}&amp;solvingId={$solvingId}&amp;page={$page}&amp;returnUrl={$returnUrl}')">
                            <span>申请退单</span>
                          </a>
                        </li>
                      </xsl:if>
                    </xsl:if>
                    <xsl:if test="DeptCode='101' and HotLinkSN!='' and InfoSourceid='10'  and IsNotHotLineSN='0' and $isCreatedByMyDept='1' and $categoryId!='4' and ISVERIFYAUTHORITY!='1'">
                      <li>
                        <a id="{$taskId}_btn045" onclick="TaskLock.Lock('{$taskId}','{$mainStatus}','../caseoperate_flat/ChuLi/ApplyDelay_Check.aspx?TaskId={$taskId}&amp;categoryId={$categoryId}&amp;solvingId={$solvingId}&amp;page={$page}&amp;returnUrl={$returnUrl}')">
                          <span>申请延期</span>
                        </a>
                      </li>
                    </xsl:if>
                  </xsl:if>


                  <xsl:if test="PlatformType='1'">
                    <xsl:if test=" isHeChaInfiSource = '1' and checkResult!='-1' ">
                      <xsl:if test="$isCreatedByMyDept='1'">
                        <xsl:if test="ExecuteDeptname!=''">
                          <li>
                            <a id="{$taskId}_btn025" onclick="TaskLock.Lock('{$taskId}','{$mainStatus}','../caseoperate_flat/JianYi/AutoSupervisionCase.aspx?TaskId={$taskId}&amp;categoryId={$categoryId}&amp;solvingId={$solvingId}&amp;page={$page}&amp;returnUrl={$returnUrl}')">
                              <span>直接结案</span>
                            </a>
                          </li>
                        </xsl:if>
                      </xsl:if>
                      <xsl:if test="$isCreatedByMyDept='0'">
                        <li>
                          <a id="{$taskId}_btn026" onclick="TaskLock.Lock('{$taskId}','{$mainStatus}','../caseoperate_flat/JianYi/AutoSupervisionCase.aspx?TaskId={$taskId}&amp;categoryId={$categoryId}&amp;solvingId={$solvingId}&amp;page={$page}&amp;returnUrl={$returnUrl}')">
                            <span>申请结案</span>
                          </a>
                        </li>
                      </xsl:if>
                    </xsl:if>

                    <xsl:if test=" isHeChaInfiSource = '0'">
                      <xsl:if test="$isCreatedByMyDept='1'">
                        <xsl:if test="ExecuteDeptname!=''">
                          <li>
                            <a id="{$taskId}_btn025" onclick="TaskLock.Lock('{$taskId}','{$mainStatus}','../caseoperate_flat/JianYi/AutoSupervisionCase.aspx?TaskId={$taskId}&amp;categoryId={$categoryId}&amp;solvingId={$solvingId}&amp;page={$page}&amp;returnUrl={$returnUrl}')">
                              <span>直接结案</span>
                            </a>
                          </li>
                        </xsl:if>
                      </xsl:if>

                    </xsl:if>

                  </xsl:if>



                </xsl:when>
                <!--督办（已完成、未完成、查询） -->
                <xsl:when test="$categoryId='8' or $categoryId='9' or $categoryId='9A' or $categoryId='9B'">
                  <!--<xsl:if test="hechaAuthorized='1'">
          <div style="margin-bottom:3px;">
            <img src="../Images/new_Hecha.gif" onclick="TaskLock.Lock('{$taskId}','{$mainStatus}','HeCha/SendToPdaCase.aspx?TaskId={$taskId}&amp;pagetype=0&amp;categoryId={$categoryId}&amp;page={$page}&amp;returnUrl={$returnUrl}')" alt="下发核查" border="0" style="cursor:hand;"/>
          </div>
        </xsl:if>-->
                   <xsl:if test="$categoryId='8'">
                    <li>
                      <a id="{$taskId}_btn022" onclick="TaskLock.Lock('{$taskId}','{$mainStatus}','../caseoperate_flat/DuBan/SuperviseCase.aspx?TaskId={$taskId}&amp;categoryId={$categoryId}&amp;solvingId={$solvingId}&amp;page={$page}&amp;returnUrl={$returnUrl}')">
                        <span>申请核查</span>
                      </a>
                    </li>
                  </xsl:if>                
                  <li>
                    <a id="{$taskId}_btn021" onclick="TaskLock.Lock('{$taskId}','{$mainStatus}','../caseoperate_flat/Dispatch/DispatchCase.aspx?TaskId={$taskId}&amp;categoryId={$categoryId}&amp;solvingId={$solvingId}&amp;page={$page}&amp;returnUrl={$returnUrl}')">
                      <span>再派遣</span>
                    </a>
                  </li>
                 <xsl:if test="$categoryId='9' or $categoryId='9B'">
                    <li>
                      <a id="{$taskId}_btn022" onclick="TaskLock.Lock('{$taskId}','{$mainStatus}','../caseoperate_flat/DuBan/SuperviseCase.aspx?TaskId={$taskId}&amp;categoryId={$categoryId}&amp;solvingId={$solvingId}&amp;page={$page}&amp;returnUrl={$returnUrl}')">
                        <span>申请核查</span>
                      </a>
                    </li>
                    <li>
                      <a id="{$taskId}_btn023" onclick="TaskLock.Lock('{$taskId}','{$mainStatus}','../caseoperate_flat/DuBan/LOpinionInput.aspx?TaskId={$taskId}&amp;categoryId={$categoryId}&amp;solvingId={$solvingId}&amp;page={$page}&amp;returnUrl={$returnUrl}')">
                        <span>催办</span>
                      </a>
                    </li>
                    <li>
                      <a id="{$taskId}_btn024" onclick="TaskLock.Lock('{$taskId}','{$mainStatus}','../caseoperate_flat/ChuLi/CollectCase.aspx?TaskId={$taskId}&amp;categoryId={$categoryId}&amp;solvingId={$solvingId}&amp;page={$page}&amp;returnUrl={$returnUrl}')">
                        <span>收单</span>
                      </a>
                    </li>
                  </xsl:if>
                  <xsl:if test="DeptCode='101' and HotLinkSN!='' and InfoSourceid='10'  and IsNotHotLineSN='0' and $isCreatedByMyDept='1' and $categoryId!='4' and ISVERIFYAUTHORITY!='1'">
                    <li>
                      <a id="{$taskId}_btn045" onclick="TaskLock.Lock('{$taskId}','{$mainStatus}','../caseoperate_flat/ChuLi/ApplyDelay_Check.aspx?TaskId={$taskId}&amp;categoryId={$categoryId}&amp;solvingId={$solvingId}&amp;page={$page}&amp;returnUrl={$returnUrl}')">
                        <span>申请延期</span>
                      </a>
                    </li>
                  </xsl:if>
                </xsl:when>
                <!--督办未完成简易-->
                <xsl:when test="$categoryId='9S' or $categoryId='9C'">

                  <li>
                    <a id="{$taskId}_btn021" onclick="TaskLock.Lock('{$taskId}','{$mainStatus}','../caseoperate_flat/Dispatch/DispatchCase.aspx?TaskId={$taskId}&amp;categoryId={$categoryId}&amp;solvingId={$solvingId}&amp;page={$page}&amp;returnUrl={$returnUrl}')">
                      <span>再派遣</span>
                    </a>
                  </li>

                  <xsl:if test=" isHeChaInfiSource = '0'">
                    <div style="margin-bottom:3px;">
                      <xsl:if test="$isCreatedByMyDept='1'">
                        <li>
                          <a id="{$taskId}_btn025" onclick="TaskLock.Lock('{$taskId}','{$mainStatus}','../caseoperate_flat/JianYi/AutoSupervisionCase.aspx?TaskId={$taskId}&amp;categoryId={$categoryId}&amp;solvingId={$solvingId}&amp;page={$page}&amp;returnUrl={$returnUrl}')">
                            <span>直接结案</span>
                          </a>
                        </li>
                      </xsl:if>

                    </div>
                  </xsl:if>
                  <li>
                    <a id="{$taskId}_btn023" onclick="TaskLock.Lock('{$taskId}','{$mainStatus}','../caseoperate_flat/DuBan/LOpinionInput.aspx?TaskId={$taskId}&amp;categoryId={$categoryId}&amp;solvingId={$solvingId}&amp;page={$page}&amp;returnUrl={$returnUrl}')">
                      <span>催办</span>
                    </a>
                  </li>

                  <xsl:if test=" isHeChaInfiSource = '1' and checkResult!='-1' ">
                    <xsl:if test="$isCreatedByMyDept='1'">
                      <li>
                        <a id="{$taskId}_btn025" onclick="TaskLock.Lock('{$taskId}','{$mainStatus}','../caseoperate_flat/JianYi/AutoSupervisionCase.aspx?TaskId={$taskId}&amp;categoryId={$categoryId}&amp;solvingId={$solvingId}&amp;page={$page}&amp;returnUrl={$returnUrl}')">
                          <span>直接结案</span>
                        </a>
                      </li>
                    </xsl:if>

                  </xsl:if>
                  <xsl:if test="$isCreatedByMyDept='0'">
                    <li>
                      <a id="{$taskId}_btn026" onclick="TaskLock.Lock('{$taskId}','{$mainStatus}','../caseoperate_flat/JianYi/AutoSupervisionCase.aspx?TaskId={$taskId}&amp;categoryId={$categoryId}&amp;solvingId={$solvingId}&amp;page={$page}&amp;returnUrl={$returnUrl}')">
                        <span>申请结案</span>
                      </a>
                    </li>
                  </xsl:if>
                  <li>
                    <a id="{$taskId}_btn024" onclick="TaskLock.Lock('{$taskId}','{$mainStatus}','../caseoperate_flat/ChuLi/CollectCase.aspx?TaskId={$taskId}&amp;categoryId={$categoryId}&amp;solvingId={$solvingId}&amp;page={$page}&amp;returnUrl={$returnUrl}')">
                      <span>收单</span>
                    </a>
                  </li>
                </xsl:when>
                <!--督办（已完成）简易-->
                <xsl:when test="$categoryId='8S'">
                  
                  <xsl:if test=" isHeChaInfiSource = '0'">
                    <xsl:if test="$isCreatedByMyDept='1'">
                      <li>
                        <a id="{$taskId}_btn025" onclick="TaskLock.Lock('{$taskId}','{$mainStatus}','../caseoperate_flat/JianYi/AutoSupervisionCase.aspx?TaskId={$taskId}&amp;categoryId={$categoryId}&amp;solvingId={$solvingId}&amp;page={$page}&amp;returnUrl={$returnUrl}')">
                          <span>直接结案</span>
                        </a>
                      </li>
                    </xsl:if>

                  </xsl:if>

                  <xsl:if test=" isHeChaInfiSource = '1' and checkResult!='-1' ">
                    <xsl:if test="$isCreatedByMyDept='1'">
                      <li>
                        <a id="{$taskId}_btn025" onclick="TaskLock.Lock('{$taskId}','{$mainStatus}','../caseoperate_flat/JianYi/AutoSupervisionCase.aspx?TaskId={$taskId}&amp;categoryId={$categoryId}&amp;solvingId={$solvingId}&amp;page={$page}&amp;returnUrl={$returnUrl}')">
                          <span>直接结案</span>
                        </a>
                      </li>
                    </xsl:if>

                  </xsl:if>

                  <xsl:if test="$isCreatedByMyDept='0'">
                    <li>
                      <a id="{$taskId}_btn026" onclick="TaskLock.Lock('{$taskId}','{$mainStatus}','../caseoperate_flat/JianYi/AutoSupervisionCase.aspx?TaskId={$taskId}&amp;categoryId={$categoryId}&amp;solvingId={$solvingId}&amp;page={$page}&amp;returnUrl={$returnUrl}')">
                        <span>申请结案</span>
                      </a>
                    </li>
                  </xsl:if>
                <xsl:if test="hechaAuthorized='1'">
                    <li>
                      <a id="{$taskId}_btn030" onclick="TaskLock.Lock('{$taskId}','{$mainStatus}','../caseoperate_flat/HeCha/SendToPdaCase.aspx?TaskId={$taskId}&amp;pagetype=1&amp;categoryId={$categoryId}&amp;page={$page}&amp;returnUrl={$returnUrl}')">
                        <span>下发核查</span>
                      </a>
                    </li>
                  </xsl:if>
                  <li>
                    <a id="{$taskId}_btn021" onclick="TaskLock.Lock('{$taskId}','{$mainStatus}','../caseoperate_flat/Dispatch/DispatchCase.aspx?TaskId={$taskId}&amp;categoryId={$categoryId}&amp;solvingId={$solvingId}&amp;page={$page}&amp;returnUrl={$returnUrl}')">
                      <span>再派遣</span>
                    </a>
                  </li>
                </xsl:when>
                <!--待下发核查,已下发核查-->
                <xsl:when test="$categoryId='13' or $categoryId='12'">
                  <xsl:if test="PlatformType='0'">
                    <li>
                      <a id="{$taskId}_btn030" onclick="TaskLock.Lock('{$taskId}','{$mainStatus}','../caseoperate_flat/HeCha/SendToPdaCase.aspx?TaskId={$taskId}&amp;pagetype=0&amp;categoryId={$categoryId}&amp;page={$page}&amp;returnUrl={$returnUrl}')">
                        <span>下发核查</span>
                      </a>
                    </li>
                  </xsl:if>
                  <xsl:if test="PlatformType='1'">
                    <li>
                      <a id="{$taskId}_btn030" onclick="TaskLock.Lock('{$taskId}','{$mainStatus}','../caseoperate_flat/HeCha/SendToPdaCase.aspx?TaskId={$taskId}&amp;pagetype=1&amp;categoryId={$categoryId}&amp;page={$page}&amp;returnUrl={$returnUrl}')">
                        <span>下发核查</span>
                      </a>
                    </li>
                    <xsl:if test=" isHeChaInfiSource = '0'  ">
                      <xsl:if test="$isCreatedByMyDept='1'">
                        <li>
                          <a id="{$taskId}_btn032" onclick="TaskLock.Lock('{$taskId}','{$mainStatus}','../caseoperate_flat/JianYi/AutoSupervisionCase.aspx?TaskId={$taskId}&amp;categoryId={$categoryId}&amp;solvingId={$solvingId}&amp;page={$page}&amp;returnUrl={$returnUrl}')">
                            <span>结案</span>
                          </a>
                        </li>
                      </xsl:if>
                    </xsl:if>
                    <xsl:if test="$isCreatedByMyDept='0'">
                      <li>
                        <a id="{$taskId}_btn026" onclick="TaskLock.Lock('{$taskId}','{$mainStatus}','../caseoperate_flat/JianYi/AutoSupervisionCase.aspx?TaskId={$taskId}&amp;categoryId={$categoryId}&amp;solvingId={$solvingId}&amp;page={$page}&amp;returnUrl={$returnUrl}')">
                          <span>申请结案</span>
                        </a>
                      </li>
                    </xsl:if>
                  </xsl:if>
                </xsl:when>
                <!--待核查-->
                <xsl:when test="$categoryId='13S'">
                  <li>
                    <a id="{$taskId}_btn031" onclick="TaskLock.Lock('{$taskId}','{$mainStatus}','../caseoperate_flat/HeCha/HeChaCase.aspx?TaskId={$taskId}&amp;categoryId={$categoryId}&amp;page={$page}&amp;returnUrl={$returnUrl}')">
                      <span>核查</span>
                    </a>
                  </li>
                </xsl:when>
                <!--热线回访-->
                <xsl:when test="$categoryId='12A'">
                  <li>
                    <a id="{$taskId}_btn033" onclick="TaskLock.Lock('{$taskId}','{$mainStatus}','../caseoperate_flat/HeCha/SendToTelask.aspx?TaskId={$taskId}&amp;categoryId={$categoryId}&amp;page={$page}&amp;returnUrl={$returnUrl}')">
                      <span>热线回访</span>
                    </a>
                  </li>
                  <li>
                    <a id="{$taskId}_btn030" onclick="TaskLock.Lock('{$taskId}','{$mainStatus}','../caseoperate_flat/HeCha/SendToPdaCase.aspx?TaskId={$taskId}&amp;pagetype=0&amp;categoryId={$categoryId}&amp;page={$page}&amp;returnUrl={$returnUrl}')">
                      <span>下发核查</span>
                    </a>
                  </li>
                  <li>
                    <a id="{$taskId}_btn034" onclick="TaskLock.Lock('{$taskId}','{$mainStatus}','../caseoperate_flat/TuiDan/BackCasetoSupervise.aspx?TaskId={$taskId}&amp;categoryId={$categoryId}&amp;page={$page}&amp;returnUrl={$returnUrl}')">
                      <span>退回</span>
                    </a>
                  </li>
                </xsl:when>
                <!--接单-->
                <xsl:when test="$categoryId='16'">
                  <li>
                    <a id="{$taskId}_btn017" onclick="TaskLock.Lock('{$taskId}','{$mainStatus}','../caseoperate_flat/JieDan/TakeCase.aspx?TaskId={$taskId}&amp;categoryId={$categoryId}&amp;solvingId={$solvingId}&amp;page={$page}&amp;returnUrl={$returnUrl}')">
                      <span>接单</span>
                    </a>
                  </li>
                  <xsl:if test="IsBackAuthority!='1' ">
                    <li>
                      <a id="{$taskId}_btn016" onclick="TaskLock.Lock('{$taskId}','{$mainStatus}','../caseoperate_flat/ChuLi/RejectCase.aspx?TaskId={$taskId}&amp;categoryId={$categoryId}&amp;solvingId={$solvingId}&amp;page={$page}&amp;returnUrl={$returnUrl}')">
                        <span>退单</span>
                      </a>
                    </li>
                  </xsl:if>
                </xsl:when>
                <!--结案-->
                <xsl:when test="$categoryId='14'">
                  
                  <li>
                    <a id="{$taskId}_btn035" onclick="TaskLock.Lock('{$taskId}','{$mainStatus}','../caseoperate_flat/JieAn/EndCase.aspx?TaskId={$taskId}&amp;categoryId={$categoryId}&amp;page={$page}&amp;returnUrl={$returnUrl}')">
                      <span>结案</span>
                    </a>
                  </li>
                  <xsl:if test="hechaAuthorized='1'">
                    <li>
                      <a id="{$taskId}_btn030" onclick="TaskLock.Lock('{$taskId}','{$mainStatus}','../caseoperate_flat/HeCha/SendToPdaCase.aspx?TaskId={$taskId}&amp;pagetype=0&amp;categoryId={$categoryId}&amp;page={$page}&amp;returnUrl={$returnUrl}')">
                        <span>下发核查</span>
                      </a>
                    </li>
                  </xsl:if>
                  <xsl:if test="(InfoSourceid='10' or InfoSourceid='48')  and IsFeedBack='0' ">
                    <li>
                      <a id="{$taskId}_btn036" onclick="TaskLock.Lock('{$taskId}','{$mainStatus}','../caseoperate_flat/JieAn/FeedBack.aspx?TaskId={$taskId}&amp;pagetype=0&amp;categoryId={$categoryId}&amp;page={$page}&amp;returnUrl={$returnUrl}')">
                        <span>反馈</span>
                      </a>
                    </li>
                  </xsl:if>
                  <li>
                    <a id="{$taskId}_btn034" onclick="TaskLock.Lock('{$taskId}','{$mainStatus}','../caseoperate_flat/TuiDan/BackCasetoSupervise.aspx?TaskId={$taskId}&amp;categoryId={$categoryId}&amp;page={$page}&amp;returnUrl={$returnUrl}')">
                      <span>退回</span>
                    </a>
                  </li>
                
                </xsl:when>
                <!--待处理、缓办、延期、查询-->
                <xsl:when test="$categoryId='17' or $categoryId='18' or $categoryId='19' or $categoryId='20'">
                  <xsl:choose>
                    <xsl:when test="InfoSourceid='10' or InfoSourceid='2' or InfoSourceid='55' or InfoSourceid='6' or InfoSourceid='9' or InfoSourceid='48' or InfoSourceid='7' or InfoSourceid='49' or InfoSourceid='50' ">
                      <li>
                        <a id="{$taskId}_btn020" onclick="TaskLock.Lock('{$taskId}','{$mainStatus}','../caseoperate_flat/Chuli/HuiFuCase.aspx?TaskId={$taskId}&amp;categoryId={$categoryId}&amp;solvingId={$solvingId}&amp;page={$page}&amp;returnUrl={$returnUrl}')">
                          <span>完成</span>
                        </a>
                      </li>
                    </xsl:when>
                    <xsl:otherwise>
                      <li>
                        <a id="{$taskId}_btn018" onclick="TaskLock.Lock('{$taskId}','{$mainStatus}','../caseoperate_flat/Chuli/SolveCase.aspx?TaskId={$taskId}&amp;categoryId={$categoryId}&amp;solvingId={$solvingId}&amp;page={$page}&amp;returnUrl={$returnUrl}')">
                          <span>完成</span>
                        </a>
                      </li>
                    </xsl:otherwise>
                  </xsl:choose>
                  <xsl:if test="IsBackAuthority!='1'">
                    <li>
                      <a id="{$taskId}_btn016" onclick="TaskLock.Lock('{$taskId}','{$mainStatus}','../caseoperate_flat/ChuLi/RejectCase.aspx?TaskId={$taskId}&amp;categoryId={$categoryId}&amp;solvingId={$solvingId}&amp;page={$page}&amp;returnUrl={$returnUrl}')">
                        <span>退单</span>
                      </a>
                    </li>
                  </xsl:if>
                  <!--是主办单位,没有申请过缓办-->
                  <xsl:if test="$deptTag='1' and $isDelay !='1' and ISVERIFYAUTHORITY!='1'">
                    <!--<div style="margin-bottom:3px;">
            <img src="../Images/TaskDelay01.gif" onclick="TaskLock.Lock('{$taskId}','{$mainStatus}','ChuLi/ApplyPostpone.aspx?TaskId={$taskId}&amp;categoryId={$categoryId}&amp;solvingId={$solvingId}&amp;page={$page}&amp;returnUrl={$returnUrl}')" title="申请缓办" border="0" style="cursor:hand;"/>
          </div>-->
                    <li>
                      <a id="{$taskId}_btn019" onclick="TaskLock.Lock('{$taskId}','{$mainStatus}','../caseoperate_flat/ChuLi/ApplyDelay.aspx?TaskId={$taskId}&amp;categoryId={$categoryId}&amp;solvingId={$solvingId}&amp;page={$page}&amp;returnUrl={$returnUrl}')">
                        <span>申请延期</span>
                      </a>
                    </li>
                  </xsl:if>
                </xsl:when>

                <!--热线处理-->
                <xsl:when test="$categoryId='17A' ">
                  <li>
                    <a id="{$taskId}_btn020" onclick="TaskLock.Lock('{$taskId}','{$mainStatus}','../caseoperate_flat/Chuli/HuiFuCase.aspx?TaskId={$taskId}&amp;categoryId={$categoryId}&amp;solvingId={$solvingId}&amp;page={$page}&amp;returnUrl={$returnUrl}')">
                      <span>完成</span>
                    </a>
                  </li>
                  <xsl:if test="IsBackAuthority!='1'">
                    <li>
                      <a id="{$taskId}_btn016" onclick="TaskLock.Lock('{$taskId}','{$mainStatus}','../caseoperate_flat/ChuLi/RejectCase.aspx?TaskId={$taskId}&amp;categoryId={$categoryId}&amp;solvingId={$solvingId}&amp;page={$page}&amp;returnUrl={$returnUrl}')">
                        <span>退单</span>
                      </a>
                    </li>
                  </xsl:if>
                  <!--是主办单位,没有申请过缓办-->
                  <xsl:if test="$deptTag='1' and $isDelay !='1' and ISVERIFYAUTHORITY!='1'">
                    <!--<div style="margin-bottom:3px;">
            <img src="../Images/TaskDelay01.gif" onclick="TaskLock.Lock('{$taskId}','{$mainStatus}','ChuLi/ApplyPostpone.aspx?TaskId={$taskId}&amp;categoryId={$categoryId}&amp;solvingId={$solvingId}&amp;page={$page}&amp;returnUrl={$returnUrl}')" alt="申请缓办" border="0" style="cursor:hand;"/>
          </div>-->
                    <li>
                      <a id="{$taskId}_btn019" onclick="TaskLock.Lock('{$taskId}','{$mainStatus}','../caseoperate_flat/ChuLi/ApplyDelay.aspx?TaskId={$taskId}&amp;categoryId={$categoryId}&amp;solvingId={$solvingId}&amp;page={$page}&amp;returnUrl={$returnUrl}')">
                        <span>申请延期</span>
                      </a>
                    </li>
                  </xsl:if>
                </xsl:when>
                <!--缓办审核-->
                <xsl:when test="$categoryId='10'">
                  <li>
                    <a id="{$taskId}_btn027" onclick="TaskLock.Lock('{$taskId}','{$mainStatus}','../caseoperate_flat/DuBan/VerifyDelay.aspx?TaskId={$taskId}&amp;categoryId={$categoryId}&amp;solvingId={$solvingId}&amp;IsDelay=1&amp;page={$page}&amp;returnUrl={$returnUrl}')">
                      <span>审核</span>
                    </a>
                  </li>
                </xsl:when>
                <!--延期审核-->
                <xsl:when test="$categoryId='11'">
                  <li>
                    <a id="{$taskId}_btn027" onclick="TaskLock.Lock('{$taskId}','{$mainStatus}','../caseoperate_flat/DuBan/VerifyDelay.aspx?TaskId={$taskId}&amp;categoryId={$categoryId}&amp;solvingId={$solvingId}&amp;IsDelay=2&amp;page={$page}&amp;returnUrl={$returnUrl}')">
                      <span>审核</span>
                    </a>
                  </li>
                </xsl:when>
                <!--退单审核-->
                <xsl:when test="$categoryId='21'">
                  <li>
                    <a id="{$taskId}_btn028" onclick="TaskLock.Lock('{$taskId}','{$mainStatus}','../caseoperate_flat/DuBan/DeptBackCheck.aspx?TaskId={$taskId}&amp;categoryId={$categoryId}&amp;solvingId={$solvingId}&amp;IsDelay=2&amp;page={$page}&amp;returnUrl={$returnUrl}')">
                      <span>退单审核</span>
                    </a>
                  </li>
                </xsl:when>
                <!--跟踪督办-->
                <xsl:when test="$categoryId='65'">
                  <li>
                    <a  onclick="TaskLock.Lock('{$taskId}','{$mainStatus}','../caseoperate_flat/DuBan/Gzdb_LOpinionInput.aspx?TaskId={$taskId}&amp;categoryId={$categoryId}&amp;solvingId={$solvingId}&amp;IsDelay=2&amp;page={$page}&amp;returnUrl=LeaderQueryTaskList.aspx?categoryId={$categoryId}')">
                      <span>跟踪督办</span>
                    </a>
                  </li>
                </xsl:when>
                <!--检查问责-->
                <xsl:when test="$categoryId='66'">
                  <li>
                    <a onclick="TaskLock.Lock('{$taskId}','{$mainStatus}','../caseoperate_flat/DuBan/Gzdb_LOpinionInput.aspx?TaskId={$taskId}&amp;categoryId={$categoryId}&amp;solvingId={$solvingId}&amp;IsDelay=2&amp;page={$page}&amp;returnUrl=LeaderQueryTaskList.aspx?categoryId={$categoryId}')">
                      <span>检查问责</span>
                    </a>
                  </li>
                </xsl:when>
                <!--领导督办-->
                <xsl:when test="$categoryId='61' or $categoryId='62'or $categoryId='63' or $categoryId='76'or $categoryId='77' or $categoryId='86'">
                  <li>
                    <a onclick="TaskLock.Lock('{$taskId}','{$mainStatus}','../caseoperate_flat/DuBan/Gzdb_LOpinionInput.aspx?TaskId={$taskId}&amp;categoryId={$categoryId}&amp;solvingId={$solvingId}&amp;IsDelay=2&amp;page={$page}&amp;returnUrl={$returnUrl}')">
                      <span>领导督办</span>
                    </a>
                  </li>
                </xsl:when>
                <xsl:when test="$categoryId='64'">
                  <li>
                    <a  onclick="TaskLock.Lock('{$taskId}','{$mainStatus}','../caseoperate_flat/DuBan/Gzdb_LOpinionInput.aspx?TaskId={$taskId}&amp;categoryId={$categoryId}&amp;solvingId={$solvingId}&amp;IsDelay=2&amp;page={$page}&amp;returnUrl=LeaderQueryTaskList.aspx?categoryId={$categoryId}')">
                      <span>领导督办</span>
                    </a>
                  </li>
                </xsl:when>
                <xsl:when test="$categoryId='71' or $categoryId='72'">
                  <!--案件提醒，案件催办-->
                  <li>
                    <a  onclick="TaskLock.Lock('{$taskId}','{$mainStatus}','../caseoperate_flat/DuBan/Gzdb_LOpinionInput.aspx?TaskId={$taskId}&amp;categoryId={$categoryId}&amp;solvingId={$solvingId}&amp;IsDelay=2&amp;page={$page}&amp;returnUrl={$returnUrl}')">
                      <span>催办</span>
                    </a>
                  </li>
                </xsl:when>
                <!--协调-->
                <xsl:when test="$categoryId='78'">
                  <li>
                    <a onclick="TaskLock.Lock('{$taskId}','{$mainStatus}','../caseoperate_flat/DuBan/Gzdb_LOpinionInput.aspx?TaskId={$taskId}&amp;categoryId={$categoryId}&amp;solvingId={$solvingId}&amp;IsDelay=2&amp;page={$page}&amp;returnUrl={$returnUrl}')">
                      <span>协调</span>
                    </a>
                  </li>
                </xsl:when>
              </xsl:choose>
              <li>
                <a id="" onclick="javascript:DisplayInfo2('{taskId}')">
                  <span>查看详情</span>
                </a>
              </li>
              <li>
                <a id="" onclick="javascript:PrintCase('{taskId}','{approach}','{InfoSourceid}')">
                  <span>打印</span>
                </a>
              </li>
            </ul>
          </div>
        </li>
      </ul>
      <script type="text/javascript">
        ShowCommontasklist.GetFistOperate('<xsl:value-of select="taskId"/>');
      </script>
    </div>
  </xsl:template>
</xsl:stylesheet>

