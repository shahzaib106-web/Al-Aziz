'use client';
import { useState } from 'react';
import {
  Users,
  Calendar,
  Clock,
  UserX,
  FileText,
  Wallet,
  Plus,
  Search,
  MoreHorizontal,
  Star,
  Phone,
  Mail,
  MapPin,
  ChevronDown,
  CheckCircle,
  ExternalLink,
  Edit,
  Shield,
  Award,
} from 'lucide-react';
import { MOCK_STAFF } from './data';

export default function StaffView() {
  const [activeTab, setActiveTab] = useState('Staff Directory');
  const [staffList, setStaffList] = useState(MOCK_STAFF);
  const [selectedStaffId, setSelectedStaffId] = useState('#101');
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');

  const selectedStaff = staffList.find((s) => s.id === selectedStaffId) || staffList[0];

  const filteredStaff = staffList.filter((s) => {
    if (roleFilter !== 'All' && s.role !== roleFilter) return false;
    if (searchQuery) {
      return (
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.phone.includes(searchQuery)
      );
    }
    return true;
  });

  return (
    <div className="space-y-5">
      {/* Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-red-700" />
            <h1 className="text-xl sm:text-2xl font-bold text-stone-900 tracking-tight">
              Staff Management
            </h1>
          </div>
          <p className="text-[13px] text-stone-500">
            Manage your team, shifts, attendance, roles and performance.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button className="px-3 py-1.5 rounded-lg bg-white border border-stone-200 text-stone-700 hover:bg-stone-50 text-xs font-semibold shadow-xs">
            Manage Roles
          </button>
          <button className="px-3 py-1.5 rounded-lg bg-white border border-stone-200 text-stone-700 hover:bg-stone-50 text-xs font-semibold shadow-xs">
            Assign Shift
          </button>
          <button className="px-3 py-1.5 rounded-lg bg-white border border-stone-200 text-stone-700 hover:bg-stone-50 text-xs font-semibold shadow-xs">
            Approve Leave
          </button>
          <button className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#911116] hover:bg-[#7D0E12] text-white text-xs font-semibold shadow-xs transition">
            <Plus className="w-4 h-4" />
            <span>Add Staff</span>
          </button>
        </div>
      </div>

      {/* 6 KPI Stat Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {/* Card 1: Total Staff */}
        <div className="bg-white rounded-xl p-3.5 border border-stone-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11.5px] font-medium text-stone-500">Total Staff</span>
            <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <Users className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="mt-2">
            <div className="text-xl font-bold text-stone-900">18</div>
            <div className="text-[11px] text-emerald-600 font-semibold mt-0.5">
              ▲ +12% vs last month
            </div>
          </div>
        </div>

        {/* Card 2: On Duty Now */}
        <div className="bg-white rounded-xl p-3.5 border border-stone-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11.5px] font-medium text-stone-500">On Duty Now</span>
            <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Clock className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="mt-2">
            <div className="text-xl font-bold text-stone-900">14</div>
            <div className="text-[11px] text-emerald-600 font-semibold mt-0.5">
              77% of total staff
            </div>
          </div>
        </div>

        {/* Card 3: On Leave */}
        <div className="bg-white rounded-xl p-3.5 border border-stone-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11.5px] font-medium text-stone-500">On Leave</span>
            <div className="w-7 h-7 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
              <Calendar className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="mt-2">
            <div className="text-xl font-bold text-stone-900">2</div>
            <div className="text-[11px] text-stone-400 font-medium mt-0.5">
              This week
            </div>
          </div>
        </div>

        {/* Card 4: Absent Today */}
        <div className="bg-white rounded-xl p-3.5 border border-stone-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11.5px] font-medium text-stone-500">Absent Today</span>
            <div className="w-7 h-7 rounded-lg bg-red-50 text-red-600 flex items-center justify-center">
              <UserX className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="mt-2">
            <div className="text-xl font-bold text-red-600">1</div>
            <div className="text-[11px] text-red-600 font-semibold mt-0.5">
              5% of total staff
            </div>
          </div>
        </div>

        {/* Card 5: Pending Leaves */}
        <div className="bg-white rounded-xl p-3.5 border border-stone-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11.5px] font-medium text-stone-500">Pending Leaves</span>
            <div className="w-7 h-7 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
              <FileText className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="mt-2">
            <div className="text-xl font-bold text-stone-900">3</div>
            <div className="text-[11px] text-stone-400 font-medium mt-0.5">
              Awaiting approval
            </div>
          </div>
        </div>

        {/* Card 6: Monthly Payroll */}
        <div className="bg-white rounded-xl p-3.5 border border-stone-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11.5px] font-medium text-stone-500">Monthly Payroll</span>
            <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Wallet className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="mt-2">
            <div className="text-xl font-bold text-stone-900">Rs. 4,85,000</div>
            <div className="text-[11px] text-emerald-600 font-semibold mt-0.5">
              ▲ +8% vs last month
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-6 border-b border-stone-200 text-xs font-semibold text-stone-500">
        {['Staff Directory', 'Shift Schedule', 'Attendance', 'Leave Requests (3)', 'Payroll', 'Performance'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-3 relative transition ${
              activeTab === tab ? 'text-red-700 font-bold' : 'hover:text-stone-800'
            }`}
          >
            {tab}
            {activeTab === tab && (
              <span className="absolute bottom-0 inset-x-0 h-0.5 bg-red-700 rounded-full" />
            )}
          </button>
        ))}
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-3 rounded-xl border border-stone-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search staff by name, role, phone..."
            className="w-full bg-stone-50 border border-stone-200 text-stone-800 placeholder-stone-400 text-xs pl-9 pr-3 py-1.5 rounded-lg focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto">
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="bg-stone-50 border border-stone-200 text-stone-700 text-xs py-1.5 px-3 rounded-lg"
          >
            <option value="All">All Roles</option>
            <option value="Head Chef">Head Chef</option>
            <option value="Sous Chef">Sous Chef</option>
            <option value="Waiter">Waiter</option>
            <option value="Cashier">Cashier</option>
            <option value="Manager">Manager</option>
          </select>

          <select className="bg-stone-50 border border-stone-200 text-stone-700 text-xs py-1.5 px-3 rounded-lg">
            <option>All Branches</option>
            <option>Main Branch</option>
            <option>Branch 2</option>
          </select>

          <select className="bg-stone-50 border border-stone-200 text-stone-700 text-xs py-1.5 px-3 rounded-lg">
            <option>All Status</option>
            <option>On Duty</option>
            <option>Off Duty</option>
            <option>On Leave</option>
          </select>
        </div>
      </div>

      {/* Main 2-Column Split: Staff Table (8 cols) + Detail Panel (4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Staff Table (8 cols) */}
        <div className="lg:col-span-8 bg-white rounded-xl border border-stone-200 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-stone-200 bg-stone-50/70 text-stone-500 font-medium">
                  <th className="py-2.5 px-3 w-8">
                    <input type="checkbox" className="rounded-sm border-stone-300 text-red-600 focus:ring-0" />
                  </th>
                  <th className="py-2.5 px-2">#</th>
                  <th className="py-2.5 px-2">Staff Member</th>
                  <th className="py-2.5 px-2">Role</th>
                  <th className="py-2.5 px-2">Branch / Section</th>
                  <th className="py-2.5 px-2">Status</th>
                  <th className="py-2.5 px-2">Today's Shift</th>
                  <th className="py-2.5 px-2">Rating</th>
                  <th className="py-2.5 px-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {filteredStaff.map((staff) => {
                  const isSelected = selectedStaffId === staff.id;
                  return (
                    <tr
                      key={staff.id}
                      onClick={() => setSelectedStaffId(staff.id)}
                      className={`cursor-pointer transition ${
                        isSelected ? 'bg-red-50/50' : 'hover:bg-stone-50/80'
                      }`}
                    >
                      <td className="py-3 px-3" onClick={(e) => e.stopPropagation()}>
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => setSelectedStaffId(staff.id)}
                          className="rounded-sm border-stone-300 text-red-600 focus:ring-0"
                        />
                      </td>
                      <td className="py-3 px-2 text-stone-400 font-medium">{staff.id}</td>
                      <td className="py-3 px-2">
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-full bg-amber-100 text-amber-900 font-bold text-[10px] flex items-center justify-center shrink-0">
                            {staff.name.split(' ').map((n) => n[0]).join('')}
                          </div>
                          <div>
                            <p className="font-bold text-stone-900 leading-tight">{staff.name}</p>
                            <p className="text-[10px] text-stone-400">{staff.phone}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-2">
                        <span className="bg-red-50 text-red-700 px-2 py-0.5 rounded font-semibold text-[10px]">
                          {staff.role}
                        </span>
                      </td>
                      <td className="py-3 px-2 text-stone-500">{staff.section}</td>
                      <td className="py-3 px-2">
                        <span
                          className={`inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                            staff.status === 'On Duty'
                              ? 'bg-emerald-50 text-emerald-700'
                              : staff.status === 'On Leave'
                              ? 'bg-red-50 text-red-700'
                              : 'bg-stone-100 text-stone-600'
                          }`}
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-current" />
                          {staff.status}
                        </span>
                      </td>
                      <td className="py-3 px-2 text-stone-600 font-medium">{staff.shift}</td>
                      <td className="py-3 px-2">
                        <div className="flex items-center gap-1 font-bold text-stone-800">
                          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                          <span>{staff.rating}</span>
                        </div>
                      </td>
                      <td className="py-3 px-3 text-right">
                        <button className="p-1 text-stone-400 hover:text-stone-600">
                          <MoreHorizontal className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Staff Detail Panel (4 cols) */}
        <div className="lg:col-span-4 bg-white rounded-xl border border-stone-200 shadow-xs p-5 flex flex-col justify-between space-y-4">
          <div className="space-y-4">
            {/* Profile Header */}
            <div className="flex items-start gap-3 pb-3 border-b border-stone-100">
              <div className="relative">
                <div className="w-14 h-14 rounded-full bg-amber-200 text-amber-900 font-black text-lg flex items-center justify-center border-2 border-white shadow-xs">
                  {selectedStaff.name.split(' ').map((n) => n[0]).join('')}
                </div>
                <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-stone-900 text-base leading-tight truncate">
                    {selectedStaff.name}
                  </h3>
                  <span className="bg-red-50 text-red-700 font-semibold px-2 py-0.5 rounded text-[10px]">
                    {selectedStaff.role}
                  </span>
                </div>
                <p className="text-xs text-stone-400 font-medium mt-0.5">ID: {selectedStaff.id}</p>

                <div className="space-y-1 mt-2 text-xs text-stone-600">
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                    <span>{selectedStaff.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                    <span className="truncate">{selectedStaff.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                    <span>{selectedStaff.section}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Sub-tabs */}
            <div className="flex items-center gap-4 text-xs font-semibold text-stone-500 border-b border-stone-100 pb-2">
              <span className="text-red-700 border-b-2 border-red-700 pb-2 -mb-2">Overview</span>
              <span>Schedule</span>
              <span>Attendance</span>
              <span>Payroll</span>
              <span>More</span>
            </div>

            {/* 3 Metric Cards */}
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="bg-stone-50 p-2.5 rounded-xl border border-stone-100">
                <span className="text-base font-black text-stone-900 flex items-center justify-center gap-1">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" /> {selectedStaff.rating}
                </span>
                <span className="text-[10px] text-stone-400 font-medium block mt-0.5">Performance</span>
              </div>
              <div className="bg-stone-50 p-2.5 rounded-xl border border-stone-100">
                <span className="text-base font-black text-stone-900">{selectedStaff.experience || '2 years'}</span>
                <span className="text-[10px] text-stone-400 font-medium block mt-0.5">Service Period</span>
              </div>
              <div className="bg-stone-50 p-2.5 rounded-xl border border-stone-100">
                <span className="text-base font-black text-emerald-600">{selectedStaff.attendance || '98%'}</span>
                <span className="text-[10px] text-stone-400 font-medium block mt-0.5">Attendance</span>
              </div>
            </div>

            {/* Role & Access Section */}
            <div className="p-3 bg-stone-50 rounded-xl border border-stone-100 space-y-2">
              <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider block">
                Role & Access
              </span>
              <div className="flex items-center justify-between text-xs">
                <span className="text-stone-500">Role:</span>
                <span className="font-bold text-stone-900">{selectedStaff.role}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-stone-500">Access Level:</span>
                <span className="font-bold text-stone-900">{selectedStaff.access || 'Kitchen Management'}</span>
              </div>

              <div className="pt-1">
                <span className="text-[10px] text-stone-400 block mb-1.5">Permissions:</span>
                <div className="flex flex-wrap gap-1">
                  {(selectedStaff.permissions || ['Manage Menu Items', 'Kitchen Orders', 'Inventory Access', 'View Reports']).map((perm, idx) => (
                    <span key={idx} className="bg-white border border-stone-200 text-stone-700 px-2 py-0.5 rounded text-[10px] font-medium">
                      {perm}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Current Shift */}
            <div className="p-3 bg-stone-50 rounded-xl border border-stone-100">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider">
                  Current Shift
                </span>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded">
                  On Duty Now
                </span>
              </div>
              <p className="text-xs font-bold text-stone-900">{selectedStaff.shift}</p>
              <p className="text-[11px] text-stone-500 mt-0.5">7 hours 30 mins elapsed</p>
              <button className="mt-2 w-full py-1 text-xs font-semibold text-red-700 bg-white border border-red-200 hover:bg-red-50 rounded-lg transition">
                Assign New Shift
              </button>
            </div>

            {/* Performance Metrics */}
            <div className="space-y-1.5 text-xs">
              <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider block">
                Performance Metrics
              </span>
              <div className="flex items-center justify-between py-1 border-b border-stone-100">
                <span className="text-stone-500">Average Rating:</span>
                <span className="font-bold text-stone-900">{selectedStaff.rating} / 5.0</span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-stone-100">
                <span className="text-stone-500">Orders Handled:</span>
                <span className="font-bold text-stone-900">{selectedStaff.ordersHandled || 126}</span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-stone-100">
                <span className="text-stone-500">Punctuality:</span>
                <span className="font-bold text-emerald-600">{selectedStaff.punctuality || '98%'}</span>
              </div>
              <div className="flex items-center justify-between py-1">
                <span className="text-stone-500">Team Feedback:</span>
                <span className="font-bold text-stone-900">{selectedStaff.feedback || 5} positive</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-2 pt-3 border-t border-stone-100">
            <button className="py-2 text-xs font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-lg transition">
              View Full Profile
            </button>
            <button className="py-2 text-xs font-bold text-white bg-[#911116] hover:bg-[#7D0E12] rounded-lg shadow-xs transition">
              Edit Staff Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
