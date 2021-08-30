let GUID = {};
let readOutput = {};
let baseTagToWrite = {};

let material = null;
let tagWriter = null;
let fileSystem = null;

let entireMaterialDirectory = null;
let materialXmlToJson = null

let userMaterialName=null;
let userMaterialGUID=null;

let tagJson = null;

let materialType = null;

let selectedMaterialName = null;
let selectedMaterialGUID = null;

let writeProgress = 0.0;

/*
	//	These functions could be potentially useful in terms of
	//	rewriting addresses that contain "hexified" numerical
	//	data such as pla-transparent-750g, where 750g would
	//	presumably be the weight of the reel

function hexToString(hex) {
	var string = '';

	for (var i = 0; i < hex.length; i++) {
		var partOfString = hex.substr(i, 2);
		var text = String.fromCodePoint(parseInt(partOfString, 16));
		string += text;
	}
	return string;
}

function stringToHex(str)
  {
	var arr1 = [];
	for (var n = 0, l = str.length; n < l; n ++) 
     {
		var hex = Number(str.charCodeAt(n)).toString(16);
		arr1.push(hex);
	 }
	return arr1.join('');
}*/

/* Base Tag */
let strxml = `<?xml version="1.0" encoding="UTF-8"?>
<scan>
	<version>4.24.5</version>
	<date>2019-10-08 16:04:32</date>
	<title>NXP Semiconductors NTAG216 tag</title>
	<uid nxp="true">04:E5:C9:22:32:5E:80</uid>
	<hasndef>false</hasndef>
	<section>
		<subsection title="IC manufacturer">
			<block type="text">
	<content>NXP Semiconductors</content>
</block>
		</subsection>
		<subsection title="IC type">
			<block type="text">
	<content>NTAG216</content>
</block>
		</subsection>
	</section>
	<section>
		<subsection title="No NDEF data storage populated">
			<block type="text">
	<content></content>
</block>
		</subsection>
	</section>
	<section>
		<subsection title="Memory size">
			<block type="text">
	<content>888 bytes user memory
‣ 222 pages, with 4 bytes per page</content>
</block>
		</subsection>
		<subsection title="IC detailed information">
			<block type="text">
	<content>Full product name: NT2H1611G0DUx
Capacitance: 50 pF</content>
</block>
		</subsection>
		<subsection title="Version information">
			<block type="text">
	<content>Vendor ID: NXP<hexoutput> (0x04)</hexoutput>
Type: NTAG<hexoutput> (0x04)</hexoutput>
Subtype: 50 pF<hexoutput> (0x02)</hexoutput>
Major version: 1<hexoutput> (0x01)</hexoutput>
Minor version: V0<hexoutput> (0x00)</hexoutput>
Storage size: 888 bytes<hexoutput> (0x13)</hexoutput>
Protocol: ISO/IEC 14443-3<hexoutput> (0x03)</hexoutput></content>
</block>
		</subsection>
		<subsection title="Configuration information">
			<block type="text">
	<content>UID ASCII mirror enabled:
‣ Page 0x0B, byte offset 0
NFC counter: disabled
No limit on wrong password attempts
Strong load modulation disabled</content>
</block>
		</subsection>
		<subsection title="Originality check">
			<block type="text">
	<content>Signature verified with NXP public key<hexoutput>ECDSA signature:
‣ r: 0x4F3E3ED31C3D7F46A8A5B169CEF6BB05
‣ s: 0x7987F213DBD2621C59AF77FB02D0FAF6</hexoutput></content>
</block>
		</subsection>
	</section>
	<section>
		<subsection title="Technologies supported">
			<block type="text">
	<content>ISO/IEC 14443-3 (Type A) compatible
ISO/IEC 14443-2 (Type A) compatible</content>
</block>
		</subsection>
		<subsection title="Android technology information">
			<block type="text">
	<content>Tag description:
‣ TAG: Tech [android.nfc.tech.NfcA, android.nfc.tech.MifareUltralight, android.nfc.tech.NdefFormatable]
‣ Maximum transceive length: 253 bytes
‣ Default maximum transceive time-out: 618 ms
<hexoutput>No MIFARE Classic support present in Android</hexoutput></content>
</block>
		</subsection>
		<subsection title="Detailed protocol information">
			<block type="text">
	<content>ID: 04:E5:C9:22:32:5E:80
ATQA: 0x4400
SAK: 0x00</content>
</block>
		</subsection>
		<subsection title="Memory content">
			<block type="Ultralight">
	<address>0</address>
	<data access="* " comment="(UID0-UID2, BCC0)">04 E5 C9 A0</data>
</block>
<block type="Ultralight">
	<address>1</address>
	<data access="* " comment="(UID3-UID6)">22 32 5E 80</data>
</block>
<block type="Ultralight">
	<address>2</address>
	<data access=". " comment="(BCC1, INT, LOCK0-LOCK1)">CE 48 00 00</data>
</block>
<block type="Ultralight">
	<address>3</address>
	<data access=". " comment="(OTP0-OTP3)">E1 10 6D 00</data>
</block>
<block type="Ultralight">
	<address>4</address>
	<data access=". ">9C 15 6C 01</data>
</block>
<block type="Ultralight">
	<address>5</address>
	<data access=". ">75 6C 74 69</data>
</block>
<block type="Ultralight">
	<address>6</address>
	<data access=". ">6D 61 6B 65</data>
</block>
<block type="Ultralight">
	<address>7</address>
	<data access=". ">72 2E 6E 6C</data>
</block>
<block type="Ultralight">
	<address>8</address>
	<data access=". ">3A 6D 61 74</data>
</block>
<block type="Ultralight">
	<address>9</address>
	<data access=". ">65 72 69 61</data>
</block>
<block type="Ultralight">
	<address>10</address>
	<data access=". ">6C 31 00 00</data>
</block>
<block type="Ultralight">
	<address>11</address>
	<data access=". ">30 34 45 35</data>
</block>
<block type="Ultralight">
	<address>12</address>
	<data access=". ">43 39 32 32</data>
</block>
<block type="Ultralight">
	<address>13</address>
	<data access=". ">33 32 35 45</data>
</block>
<block type="Ultralight">
	<address>14</address>
	<data access=". ">38 30 41 11</data>
</block>
<block type="Ultralight">
	<address>15</address>
	<data access=". ">E6 8D A3 6A</data>
</block>
<block type="Ultralight">
	<address>16</address>
	<data access=". ">40 10 FE 15</data>
</block>
<block type="Ultralight">
	<address>17</address>
	<data access=". ">ED 8A 33 C3</data>
</block>
<block type="Ultralight">
	<address>18</address>
	<data access=". ">4F 57 A2 A7</data>
</block>
<block type="Ultralight">
	<address>19</address>
	<data access=". ">B4 B7 8A 38</data>
</block>
<block type="Ultralight">
	<address>20</address>
	<data access=". ">C3 CB 00 15</data>
</block>
<block type="Ultralight">
	<address>21</address>
	<data access=". ">31 36 31 36</data>
</block>
<block type="Ultralight">
	<address>22</address>
	<data access=". ">34 34 30 31</data>
</block>
<block type="Ultralight">
	<address>23</address>
	<data access=". ">00 00 00 00</data>
</block>
<block type="Ultralight">
	<address>24</address>
	<data access=". ">00 00 00 00</data>
</block>
<block type="Ultralight">
	<address>25</address>
	<data access=". ">00 00 00 00</data>
</block>
<block type="Ultralight">
	<address>26</address>
	<data access=". ">00 00 00 00</data>
</block>
<block type="Ultralight">
	<address>27</address>
	<data access=". ">00 00 00 00</data>
</block>
<block type="Ultralight">
	<address>28</address>
	<data access=". ">00 00 00 00</data>
</block>
<block type="Ultralight">
	<address>29</address>
	<data access=". ">00 00 00 00</data>
</block>
<block type="Ultralight">
	<address>30</address>
	<data access=". ">00 00 00 00</data>
</block>
<block type="Ultralight">
	<address>31</address>
	<data access=". ">00 00 00 00</data>
</block>
<block type="Ultralight">
	<address>32</address>
	<data access=". ">00 00 00 00</data>
</block>
<block type="Ultralight">
	<address>33</address>
	<data access=". ">00 00 00 00</data>
</block>
<block type="Ultralight">
	<address>34</address>
	<data access=". ">00 00 00 00</data>
</block>
<block type="Ultralight">
	<address>35</address>
	<data access=". ">00 00 00 00</data>
</block>
<block type="Ultralight">
	<address>36</address>
	<data access=". ">00 00 00 00</data>
</block>
<block type="Ultralight">
	<address>37</address>
	<data access=". ">00 00 11 03</data>
</block>
<block type="Ultralight">
	<address>38</address>
	<data access=". ">02 53 69 67</data>
</block>
<block type="Ultralight">
	<address>39</address>
	<data access=". ">20 00 1C 11</data>
</block>
<block type="Ultralight">
	<address>40</address>
	<data access=". ">14 01 75 6C</data>
</block>
<block type="Ultralight">
	<address>41</address>
	<data access=". ">74 69 6D 61</data>
</block>
<block type="Ultralight">
	<address>42</address>
	<data access=". ">6B 65 72 2E</data>
</block>
<block type="Ultralight">
	<address>43</address>
	<data access=". ">6E 6C 3A 73</data>
</block>
<block type="Ultralight">
	<address>44</address>
	<data access=". ">74 61 74 32</data>
</block>
<block type="Ultralight">
	<address>45</address>
	<data access=". ">00 00 02 00</data>
</block>
<block type="Ultralight">
	<address>46</address>
	<data access=". ">05 57 30 00</data>
</block>
<block type="Ultralight">
	<address>47</address>
	<data access=". ">03 AA A3 00</data>
</block>
<block type="Ultralight">
	<address>48</address>
	<data access=". ">00 00 00 00</data>
</block>
<block type="Ultralight">
	<address>49</address>
	<data access=". ">00 8C 8D 97</data>
</block>
<block type="Ultralight">
	<address>50</address>
	<data access=". ">5C 11 14 01</data>
</block>
<block type="Ultralight">
	<address>51</address>
	<data access=". ">75 6C 74 69</data>
</block>
<block type="Ultralight">
	<address>52</address>
	<data access=". ">6D 61 6B 65</data>
</block>
<block type="Ultralight">
	<address>53</address>
	<data access=". ">72 2E 6E 6C</data>
</block>
<block type="Ultralight">
	<address>54</address>
	<data access=". ">3A 73 74 61</data>
</block>
<block type="Ultralight">
	<address>55</address>
	<data access=". ">74 32 00 00</data>
</block>
<block type="Ultralight">
	<address>56</address>
	<data access=". ">02 00 05 57</data>
</block>
<block type="Ultralight">
	<address>57</address>
	<data access=". ">30 00 03 AA</data>
</block>
<block type="Ultralight">
	<address>58</address>
	<data access=". ">81 00 00 00</data>
</block>
<block type="Ultralight">
	<address>59</address>
	<data access=". ">00 00 00 8C</data>
</block>
<block type="Ultralight">
	<address>60</address>
	<data access=". ">64 F9 00 00</data>
</block>
<block type="Ultralight">
	<address>61</address>
	<data access=". ">00 00 00 00</data>
</block>
<block type="Ultralight">
	<address>62</address>
	<data access=". ">00 00 00 00</data>
</block>
<block type="Ultralight">
	<address>63</address>
	<data access=". ">00 00 00 00</data>
</block>
<block type="Ultralight">
	<address>64</address>
	<data access=". ">00 00 00 00</data>
</block>
<block type="Ultralight">
	<address>65</address>
	<data access=". ">00 00 00 00</data>
</block>
<block type="Ultralight">
	<address>66</address>
	<data access=". ">00 00 00 00</data>
</block>
<block type="Ultralight">
	<address>67</address>
	<data access=". ">00 00 00 00</data>
</block>
<block type="Ultralight">
	<address>68</address>
	<data access=". ">00 00 00 00</data>
</block>
<block type="Ultralight">
	<address>69</address>
	<data access=". ">00 00 00 00</data>
</block>
<block type="Ultralight">
	<address>70</address>
	<data access=". ">00 00 00 00</data>
</block>
<block type="Ultralight">
	<address>71</address>
	<data access=". ">00 00 00 00</data>
</block>
<block type="Ultralight">
	<address>72</address>
	<data access=". ">00 00 00 00</data>
</block>
<block type="Ultralight">
	<address>73</address>
	<data access=". ">00 00 00 00</data>
</block>
<block type="Ultralight">
	<address>74</address>
	<data access=". ">00 00 00 00</data>
</block>
<block type="Ultralight">
	<address>75</address>
	<data access=". ">00 00 00 00</data>
</block>
<block type="Ultralight">
	<address>76</address>
	<data access=". ">00 00 00 00</data>
</block>
<block type="Ultralight">
	<address>77</address>
	<data access=". ">00 00 00 00</data>
</block>
<block type="Ultralight">
	<address>78</address>
	<data access=". ">00 00 00 00</data>
</block>
<block type="Ultralight">
	<address>79</address>
	<data access=". ">00 00 00 00</data>
</block>
<block type="Ultralight">
	<address>80</address>
	<data access=". ">00 00 00 00</data>
</block>
<block type="Ultralight">
	<address>81</address>
	<data access=". ">00 00 00 00</data>
</block>
<block type="Ultralight">
	<address>82</address>
	<data access=". ">00 00 00 00</data>
</block>
<block type="Ultralight">
	<address>83</address>
	<data access=". ">00 00 00 00</data>
</block>
<block type="Ultralight">
	<address>84</address>
	<data access=". ">00 00 00 00</data>
</block>
<block type="Ultralight">
	<address>85</address>
	<data access=". ">00 00 00 00</data>
</block>
<block type="Ultralight">
	<address>86</address>
	<data access=". ">00 00 00 00</data>
</block>
<block type="Ultralight">
	<address>87</address>
	<data access=". ">00 00 00 00</data>
</block>
<block type="Ultralight">
	<address>88</address>
	<data access=". ">00 00 00 00</data>
</block>
<block type="Ultralight">
	<address>89</address>
	<data access=". ">00 00 00 00</data>
</block>
<block type="Ultralight">
	<address>90</address>
	<data access=". ">00 00 00 00</data>
</block>
<block type="Ultralight">
	<address>91</address>
	<data access=". ">00 00 00 00</data>
</block>
<block type="Ultralight">
	<address>92</address>
	<data access=". ">00 00 00 00</data>
</block>
<block type="Ultralight">
	<address>93</address>
	<data access=". ">00 00 00 00</data>
</block>
<block type="Ultralight">
	<address>94</address>
	<data access=". ">00 00 00 00</data>
</block>
<block type="Ultralight">
	<address>95</address>
	<data access=". ">00 00 00 00</data>
</block>
<block type="Ultralight">
	<address>96</address>
	<data access=". ">00 00 00 00</data>
</block>
<block type="Ultralight">
	<address>97</address>
	<data access=". ">00 00 00 00</data>
</block>
<block type="Ultralight">
	<address>98</address>
	<data access=". ">00 00 00 00</data>
</block>
<block type="Ultralight">
	<address>99</address>
	<data access=". ">00 00 00 00</data>
</block>
<block type="Ultralight">
	<address>100</address>
	<data access=". ">00 00 00 00</data>
</block>
<block type="Ultralight">
	<address>101</address>
	<data access=". ">00 00 00 00</data>
</block>
<block type="Ultralight">
	<address>102</address>
	<data access=". ">00 00 00 00</data>
</block>
<block type="Ultralight">
	<address>103</address>
	<data access=". ">00 00 00 00</data>
</block>
<block type="Ultralight">
	<address>104</address>
	<data access=". ">00 00 00 00</data>
</block>
<block type="Ultralight">
	<address>105</address>
	<data access=". ">00 00 00 00</data>
</block>
<block type="Ultralight">
	<address>106</address>
	<data access=". ">00 00 00 00</data>
</block>
<block type="Ultralight">
	<address>107</address>
	<data access=". ">00 00 00 00</data>
</block>
<block type="Ultralight">
	<address>108</address>
	<data access=". ">00 00 00 00</data>
</block>
<block type="Ultralight">
	<address>109</address>
	<data access=". ">00 00 00 00</data>
</block>
<block type="Ultralight">
	<address>110</address>
	<data access=". ">00 00 00 00</data>
</block>
<block type="Ultralight">
	<address>111</address>
	<data access=". ">00 00 00 00</data>
</block>
<block type="Ultralight">
	<address>112</address>
	<data access=". ">00 00 00 00</data>
</block>
<block type="Ultralight">
	<address>113</address>
	<data access=". ">00 00 00 00</data>
</block>
<block type="Ultralight">
	<address>114</address>
	<data access=". ">00 00 00 00</data>
</block>
<block type="Ultralight">
	<address>115</address>
	<data access=". ">00 00 00 00</data>
</block>
<block type="Ultralight">
	<address>116</address>
	<data access=". ">00 00 00 00</data>
</block>
<block type="Ultralight">
	<address>117</address>
	<data access=". ">00 00 00 00</data>
</block>
<block type="Ultralight">
	<address>118</address>
	<data access=". ">00 00 00 00</data>
</block>
<block type="Ultralight">
	<address>119</address>
	<data access=". ">00 00 00 00</data>
</block>
<block type="Ultralight">
	<address>120</address>
	<data access=". ">00 00 00 00</data>
</block>
<block type="Ultralight">
	<address>121</address>
	<data access=". ">00 00 00 00</data>
</block>
<block type="Ultralight">
	<address>122</address>
	<data access=". ">00 00 00 00</data>
</block>
<block type="Ultralight">
	<address>123</address>
	<data access=". ">00 00 00 00</data>
</block>
<block type="Ultralight">
	<address>124</address>
	<data access=". ">00 00 00 00</data>
</block>
<block type="Ultralight">
	<address>125</address>
	<data access=". ">00 00 00 00</data>
</block>
<block type="Ultralight">
	<address>126</address>
	<data access=". ">00 00 00 00</data>
</block>
<block type="Ultralight">
	<address>127</address>
	<data access=". ">00 00 00 00</data>
</block>
<block type="Ultralight">
	<address>128</address>
	<data access=". ">00 00 00 00</data>
</block>
<block type="Ultralight">
	<address>129</address>
	<data access=". ">00 00 00 00</data>
</block>
<block type="Ultralight">
	<address>130</address>
	<data access=". ">00 00 00 00</data>
</block>
<block type="Ultralight">
	<address>131</address>
	<data access=". ">00 00 00 00</data>
</block>
<block type="Ultralight">
	<address>132</address>
	<data access=". ">00 00 00 00</data>
</block>
<block type="Ultralight">
	<address>133</address>
	<data access=". ">00 00 00 00</data>
</block>
<block type="Ultralight">
	<address>134</address>
	<data access=". ">00 00 00 00</data>
</block>
<block type="Ultralight">
	<address>135</address>
	<data access=". ">00 00 00 00</data>
</block>
<block type="Ultralight">
	<address>136</address>
	<data access=". ">00 00 00 00</data>
</block>
<block type="Ultralight">
	<address>137</address>
	<data access=". ">00 00 00 00</data>
</block>
<block type="Ultralight">
	<address>138</address>
	<data access=". ">00 00 00 00</data>
</block>
<block type="Ultralight">
	<address>139</address>
	<data access=". ">00 00 00 00</data>
</block>
<block type="Ultralight">
	<address>140</address>
	<data access=". ">00 00 00 00</data>
</block>
<block type="Ultralight">
	<address>141</address>
	<data access=". ">00 00 00 00</data>
</block>
<block type="Ultralight">
	<address>142</address>
	<data access=". ">00 00 00 00</data>
</block>
<block type="Ultralight">
	<address>143</address>
	<data access=". ">00 00 00 00</data>
</block>
<block type="Ultralight">
	<address>144</address>
	<data access=". ">00 00 00 00</data>
</block>
<block type="Ultralight">
	<address>145</address>
	<data access=". ">00 00 00 00</data>
</block>
<block type="Ultralight">
	<address>146</address>
	<data access=". ">00 00 00 00</data>
</block>
<block type="Ultralight">
	<address>147</address>
	<data access=". ">00 00 00 00</data>
</block>
<block type="Ultralight">
	<address>148</address>
	<data access=". ">00 00 00 00</data>
</block>
<block type="Ultralight">
	<address>149</address>
	<data access=". ">00 00 00 00</data>
</block>
<block type="Ultralight">
	<address>150</address>
	<data access=". ">00 00 00 00</data>
</block>
<block type="Ultralight">
	<address>151</address>
	<data access=". ">00 00 00 00</data>
</block>
<block type="Ultralight">
	<address>152</address>
	<data access=". ">00 00 00 00</data>
</block>
<block type="Ultralight">
	<address>153</address>
	<data access=". ">00 00 00 00</data>
</block>
<block type="Ultralight">
	<address>154</address>
	<data access=". ">00 00 00 00</data>
</block>
<block type="Ultralight">
	<address>155</address>
	<data access=". ">00 00 00 00</data>
</block>
<block type="Ultralight">
	<address>156</address>
	<data access=". ">00 00 00 00</data>
</block>
<block type="Ultralight">
	<address>157</address>
	<data access=". ">00 00 00 00</data>
</block>
<block type="Ultralight">
	<address>158</address>
	<data access=". ">00 00 00 00</data>
</block>
<block type="Ultralight">
	<address>159</address>
	<data access=". ">00 00 00 00</data>
</block>
<block type="Ultralight">
	<address>160</address>
	<data access=". ">00 00 00 00</data>
</block>
<block type="Ultralight">
	<address>161</address>
	<data access=". ">00 00 00 00</data>
</block>
<block type="Ultralight">
	<address>162</address>
	<data access=". ">00 00 00 00</data>
</block>
<block type="Ultralight">
	<address>163</address>
	<data access=". ">00 00 00 00</data>
</block>
<block type="Ultralight">
	<address>164</address>
	<data access=". ">00 00 00 00</data>
</block>
<block type="Ultralight">
	<address>165</address>
	<data access=". ">00 00 00 00</data>
</block>
<block type="Ultralight">
	<address>166</address>
	<data access=". ">00 00 00 00</data>
</block>
<block type="Ultralight">
	<address>167</address>
	<data access=". ">00 00 00 00</data>
</block>
<block type="Ultralight">
	<address>168</address>
	<data access=". ">00 00 00 00</data>
</block>
<block type="Ultralight">
	<address>169</address>
	<data access=". ">00 00 00 00</data>
</block>
<block type="Ultralight">
	<address>170</address>
	<data access=". ">00 00 00 00</data>
</block>
<block type="Ultralight">
	<address>171</address>
	<data access=". ">00 00 00 00</data>
</block>
<block type="Ultralight">
	<address>172</address>
	<data access=". ">00 00 00 00</data>
</block>
<block type="Ultralight">
	<address>173</address>
	<data access=". ">00 00 00 00</data>
</block>
<block type="Ultralight">
	<address>174</address>
	<data access=". ">00 00 00 00</data>
</block>
<block type="Ultralight">
	<address>175</address>
	<data access=". ">00 00 00 00</data>
</block>
<block type="Ultralight">
	<address>176</address>
	<data access=". ">00 00 00 00</data>
</block>
<block type="Ultralight">
	<address>177</address>
	<data access=". ">00 00 00 00</data>
</block>
<block type="Ultralight">
	<address>178</address>
	<data access=". ">00 00 00 00</data>
</block>
<block type="Ultralight">
	<address>179</address>
	<data access=". ">00 00 00 00</data>
</block>
<block type="Ultralight">
	<address>180</address>
	<data access=". ">00 00 00 00</data>
</block>
<block type="Ultralight">
	<address>181</address>
	<data access=". ">00 00 00 00</data>
</block>
<block type="Ultralight">
	<address>182</address>
	<data access=". ">00 00 00 00</data>
</block>
<block type="Ultralight">
	<address>183</address>
	<data access=". ">00 00 00 00</data>
</block>
<block type="Ultralight">
	<address>184</address>
	<data access=". ">00 00 00 00</data>
</block>
<block type="Ultralight">
	<address>185</address>
	<data access=". ">00 00 00 00</data>
</block>
<block type="Ultralight">
	<address>186</address>
	<data access=". ">00 00 00 00</data>
</block>
<block type="Ultralight">
	<address>187</address>
	<data access=". ">00 00 00 00</data>
</block>
<block type="Ultralight">
	<address>188</address>
	<data access=". ">00 00 00 00</data>
</block>
<block type="Ultralight">
	<address>189</address>
	<data access=". ">00 00 00 00</data>
</block>
<block type="Ultralight">
	<address>190</address>
	<data access=". ">00 00 00 00</data>
</block>
<block type="Ultralight">
	<address>191</address>
	<data access=". ">00 00 00 00</data>
</block>
<block type="Ultralight">
	<address>192</address>
	<data access=". ">00 00 00 00</data>
</block>
<block type="Ultralight">
	<address>193</address>
	<data access=". ">00 00 00 00</data>
</block>
<block type="Ultralight">
	<address>194</address>
	<data access=". ">00 00 00 00</data>
</block>
<block type="Ultralight">
	<address>195</address>
	<data access=". ">00 00 00 00</data>
</block>
<block type="Ultralight">
	<address>196</address>
	<data access=". ">00 00 00 00</data>
</block>
<block type="Ultralight">
	<address>197</address>
	<data access=". ">00 00 00 00</data>
</block>
<block type="Ultralight">
	<address>198</address>
	<data access=". ">00 00 00 00</data>
</block>
<block type="Ultralight">
	<address>199</address>
	<data access=". ">00 00 00 00</data>
</block>
<block type="Ultralight">
	<address>200</address>
	<data access=". ">00 00 00 00</data>
</block>
<block type="Ultralight">
	<address>201</address>
	<data access=". ">00 00 00 00</data>
</block>
<block type="Ultralight">
	<address>202</address>
	<data access=". ">00 00 00 00</data>
</block>
<block type="Ultralight">
	<address>203</address>
	<data access=". ">00 00 00 00</data>
</block>
<block type="Ultralight">
	<address>204</address>
	<data access=". ">00 00 00 00</data>
</block>
<block type="Ultralight">
	<address>205</address>
	<data access=". ">00 00 00 00</data>
</block>
<block type="Ultralight">
	<address>206</address>
	<data access=". ">00 00 00 00</data>
</block>
<block type="Ultralight">
	<address>207</address>
	<data access=". ">00 00 00 00</data>
</block>
<block type="Ultralight">
	<address>208</address>
	<data access=". ">00 00 00 00</data>
</block>
<block type="Ultralight">
	<address>209</address>
	<data access=". ">00 00 00 00</data>
</block>
<block type="Ultralight">
	<address>210</address>
	<data access=". ">00 00 00 00</data>
</block>
<block type="Ultralight">
	<address>211</address>
	<data access=". ">00 00 00 00</data>
</block>
<block type="Ultralight">
	<address>212</address>
	<data access=". ">00 00 00 00</data>
</block>
<block type="Ultralight">
	<address>213</address>
	<data access=". ">00 00 00 00</data>
</block>
<block type="Ultralight">
	<address>214</address>
	<data access=". ">00 00 00 00</data>
</block>
<block type="Ultralight">
	<address>215</address>
	<data access=". ">00 00 00 00</data>
</block>
<block type="Ultralight">
	<address>216</address>
	<data access=". ">00 00 00 00</data>
</block>
<block type="Ultralight">
	<address>217</address>
	<data access=". ">00 00 00 00</data>
</block>
<block type="Ultralight">
	<address>218</address>
	<data access=". ">00 00 00 00</data>
</block>
<block type="Ultralight">
	<address>219</address>
	<data access=". ">00 00 00 00</data>
</block>
<block type="Ultralight">
	<address>220</address>
	<data access=". ">00 00 00 00</data>
</block>
<block type="Ultralight">
	<address>221</address>
	<data access=". ">00 00 00 00</data>
</block>
<block type="Ultralight">
	<address>222</address>
	<data access=". ">00 00 00 00</data>
</block>
<block type="Ultralight">
	<address>223</address>
	<data access=". ">00 00 00 00</data>
</block>
<block type="Ultralight">
	<address>224</address>
	<data access=". ">00 00 00 00</data>
</block>
<block type="Ultralight">
	<address>225</address>
	<data access=". ">00 00 00 00</data>
</block>
<block type="Ultralight">
	<address>226</address>
	<data access=". " comment="(LOCK2-LOCK4, CHK)">00 00 00 BD</data>
</block>
<block type="Ultralight">
	<address>227</address>
	<data access=". " comment="(CFG, MIRROR, AUTH0)">40 00 0B FF</data>
</block>
<block type="Ultralight">
	<address>228</address>
	<data access=". " comment="(ACCESS)" length="2">00 00</data>
</block>
<block type="Ultralight">
	<address>229</address>
	<data access="+P" comment="(PWD0-PWD3)" secure="true"/>
</block>
<block type="Ultralight">
	<address>230</address>
	<data access="+P" comment="(PACK0-PACK1)" secure="true" length="2"/>
</block>
<block type="text">
	<content>
  *:locked &amp; blocked, x:locked,
  +:blocked, .:un(b)locked, ?:unknown
  r:readable (write-protected),
  p:password protected, -:write-only
  P:password protected write-only</content>
</block>
		</subsection>
	</section>
</scan>
`